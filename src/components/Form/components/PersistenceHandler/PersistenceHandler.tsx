/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import FIELD_TYPES from '../../../../typedefs/FieldTypes';
import { useLocalStorage } from '../../../../util/hooks';
import { IFieldConfig } from '../../../../typedefs/FieldConfiguration';
import { ISection } from '../../../../typedefs/typedefs';

interface PersistenceHandlerProps {
  fieldConfigs: IFieldConfig;
  persistenceKey: string;
  sections: Array<ISection>;
}

export const PersistenceHandler = ({
  fieldConfigs,
  persistenceKey,
  sections,
}: PersistenceHandlerProps) => {
  const { getValues, formState, reset } = useFormContext();
  const { isSubmitting, isSubmitted } = formState;

  const [persistedLocalForm, setPersistedLocalForm] = useLocalStorage<any>(
    persistenceKey,
    undefined
  );

  ////
  // Handler section
  ////
  const handlePersistForm = useCallback(() => {
    const { isDirtyChecker, ...rest } = getValues();

    // only persist entries which do not have type file
    // => not able to programmatically set file fields
    // => load files from backend session
    const fileFields: Array<string> = [];
    sections.forEach((section) => {
      section.fields.forEach((field) => {
        const { fieldType } = fieldConfigs[field];
        if (fieldType === FIELD_TYPES.FILE) {
          fileFields.push(field);
        }
      });
    });

    const fieldsToPersist = Object.keys(rest)
      .filter((key) => !fileFields.includes(key))
      .reduce((obj: { [key: string]: string }, key) => {
        obj[key] = rest[key];
        return obj;
      }, {});

    // persistForm if submission is not in progress or has been finished
    if (!isSubmitting && !isSubmitted) {
      setPersistedLocalForm(fieldsToPersist);
    }
  }, [
    fieldConfigs,
    getValues,
    isSubmitted,
    isSubmitting,
    sections,
    setPersistedLocalForm,
  ]);

  //
  // Persistence handling
  //

  // register persistence handler or persist form
  useEffect(() => {
    // see https://developers.google.com/web/updates/2018/07/page-lifecycle-api#the-unload-event for more information
    const terminationEvent =
      'onpagehide' in window.self ? 'pagehide' : 'unload';

    window.addEventListener(terminationEvent, handlePersistForm, {
      capture: true,
    });

    return () => {
      // if the component is unmounted correctly, there is no need to persist the form on site leave/termination event
      window.removeEventListener(terminationEvent, handlePersistForm, {
        capture: true,
      });
      handlePersistForm();
    };
  }, [handlePersistForm]);

  // reset the form from local storage
  useEffect(() => {
    // ignore persistence if it is disabled

    // reset form if its the first render
    if (!isSubmitted && !isSubmitting && persistedLocalForm !== undefined) {
      reset(persistedLocalForm);
    }
  }, [persistedLocalForm, isSubmitting, isSubmitted, reset]);

  // delete the entry from local storage after submission
  useEffect(() => {
    // remove persisted form when it was submitted
    if (isSubmitted) {
      localStorage.removeItem(persistenceKey);
    }
  }, [persistenceKey, isSubmitted]);

  return <></>;
};

export default PersistenceHandler;
