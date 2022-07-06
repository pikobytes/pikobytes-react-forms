/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { ErrorBoundary } from 'react-error-boundary';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';

import FormErrorFallback from '../FormErrorFallback/FormErrorFallback';
import { usePrevious } from '../../util/hooks';
import PersistenceHandler from './components/PersistenceHandler/PersistenceHandler';
import {
  validateFieldConfiguration,
  validateUiConfiguration,
} from '../../util/ConfigurationParser';
import {
  cloneValues,
  getDefaultValues,
  getDependentOnFields,
} from './util/util';
import { Section } from '../Section/Section';
import {
  TStringIndexableObject,
  TCustomMapping,
  TVariant,
  TValidationFunctionLookup,
} from '../../typedefs/typedefs';

export interface IFormProps {
  activatePersistence?: boolean;
  configuration: Object;
  customMapping?: TCustomMapping;
  fieldsToWatch?: Array<string>;
  formId: string;
  initialValues?: {
    [key: string]: string;
  };
  loadingFields?: Array<string>;
  onError: (
    errors: TStringIndexableObject<FieldError | undefined>,
    values: TStringIndexableObject<string>
  ) => void;
  onPublishValues?: (
    fieldValues: Array<string>,
    previousFieldValues: Array<string>,
    options: { setValue: (field: string, newValue: string) => void }
  ) => void;
  onSetIsDirty?: (isDirty: boolean) => void;
  onSubmit: (data: any) => void;
  onUpdateResetForm?: (e: any) => void;
  persistenceKey?: string;
  uiConfiguration: Object;
  variant?: TVariant;
  validationFunctions?: TValidationFunctionLookup;
}

export const MANUAL_DIRTY_TRIGGER_ID = 'MANUAL_DIRTY_TRIGGER';

const filterOutInternalFields = (
  internalValues: TStringIndexableObject<string>
) => {
  const { MANUAL_DIRTY_TRIGGER, ...values } = internalValues;

  return values;
};

export function Form(props: IFormProps) {
  const {
    activatePersistence = false,
    configuration,
    uiConfiguration,
    customMapping,
    fieldsToWatch,
    formId,
    initialValues,
    loadingFields,
    onError,
    onPublishValues,
    onSetIsDirty,
    onSubmit,
    onUpdateResetForm,
    persistenceKey,
    variant,
    validationFunctions,
  } = props;

  const [blockPublish, setBlockPublish] = useState<boolean>(false);

  // initialize configs from props
  const fieldConfigs = useMemo(
    () => validateFieldConfiguration(configuration),
    [configuration]
  );
  const uiSettings = useMemo(
    () => validateUiConfiguration(uiConfiguration),
    [uiConfiguration]
  );

  // read default values from configuration
  const defaultValues = getDefaultValues(initialValues, fieldConfigs);

  // initialize form
  const formMethods = useForm({
    defaultValues,
    shouldUnregister: true,
  });

  // read form properties
  const { formState, getValues, handleSubmit, reset, setValue, watch } =
    formMethods;

  const { dirtyFields, errors } = formState;

  // derived state

  const isDirty = Object.keys(dirtyFields).length > 0;

  const fieldValues =
    fieldsToWatch === undefined
      ? undefined
      : watch(fieldsToWatch).map(cloneValues);
  const previousFieldValues = usePrevious(fieldValues);

  const sections = uiSettings.sections ?? [
    { fields: Object.keys(fieldConfigs) },
  ];

  // register manual dirty trigger value
  formMethods.register(MANUAL_DIRTY_TRIGGER_ID);

  // trigger a rerender if the value of the dependent fields change
  const dependentOnFields = getDependentOnFields(fieldConfigs);
  const valuesOfDependentOnFields = watch(dependentOnFields);

  //
  // Handler section
  //

  const handleDirtyForm = (dirty = true) => {
    if (dirty) {
      setValue(MANUAL_DIRTY_TRIGGER_ID, 'a', { shouldDirty: true });
    } else {
      setValue(MANUAL_DIRTY_TRIGGER_ID, '', { shouldDirty: true });
    }
  };

  const handleInternalSubmit = (values: TStringIndexableObject<string>) => {
    const externalValues = filterOutInternalFields(values);

    onSubmit(externalValues);
  };

  const handleReset = () => {
    reset();
  };

  //
  // Effect section
  //

  // update initial values of the form if the supplied initial values change
  useEffect(() => {
    setBlockPublish(true);
    reset(initialValues, { keepValues: true });

    // the "isDirty" - check is triggered by a change/blur
    //  -> focus and blur field in order to trigger an update of isDirty after
    //  receiving new initial Values
  }, [initialValues, reset]);

  // publish errors if there are any
  const errorLength = Object.keys(errors).length;

  useEffect(() => {
    if (errorLength > 0 && onError !== undefined) {
      onError(errors, filterOutInternalFields(getValues()));
    }
  }, [onError, errors, errorLength, getValues]);

  //
  // Outside propagation
  //

  // propagate watched fields
  useEffect(() => {
    if (blockPublish) {
      setBlockPublish(false);
    } else if (
      fieldValues !== undefined &&
      previousFieldValues !== undefined &&
      onPublishValues !== undefined
    ) {
      onPublishValues(fieldValues as string[], previousFieldValues, {
        setValue,
      });
    }
  }, [
    blockPublish,
    fieldValues,
    onPublishValues,
    previousFieldValues,
    setValue,
  ]);

  // propagate isDirty changes to outside components
  useEffect(() => {
    if (onSetIsDirty) {
      onSetIsDirty(isDirty);
    }
  }, [isDirty, onSetIsDirty]);

  // propagate reset function to outside components
  useEffect(() => {
    if (onUpdateResetForm !== undefined) {
      onUpdateResetForm(reset);
    }
  }, [onUpdateResetForm, reset]);

  return (
    <ErrorBoundary FallbackComponent={FormErrorFallback} onReset={handleReset}>
      <FormProvider {...formMethods}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <>
            {activatePersistence && (
              <PersistenceHandler
                fieldConfigs={fieldConfigs}
                persistenceKey={persistenceKey ?? formId}
                sections={sections}
              />
            )}
            <form id={formId} onSubmit={handleSubmit(handleInternalSubmit)}>
              {sections.map(({ title, fields }, index) => (
                <Section
                  customMapping={customMapping}
                  fieldConfigs={fieldConfigs}
                  fields={fields}
                  loadingFields={loadingFields}
                  key={`${title}_${index}`}
                  title={title}
                  uiSettings={uiSettings}
                  variant={variant}
                  validationFunctionLookup={validationFunctions}
                />
              ))}
            </form>
          </>
        </LocalizationProvider>
      </FormProvider>
    </ErrorBoundary>
  );
}

export default Form;
