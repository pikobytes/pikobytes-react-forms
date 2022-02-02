/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import {useCallback, useEffect} from "react";

import FIELD_TYPES from "../../../../typedefs/FieldTypes";
import {useLocalStorage} from "../../../../hooks";
import {IField} from "../../../../typedefs/IField";
import {useFormContext} from "react-hook-form";

interface PersistenceHandlerProps {
    activatePersistence: boolean;
    persistenceKey: string;
    sections: Array<{title: string, fields: Array<IField>}>
}


export const PersistenceHandler = ({activatePersistence, persistenceKey, sections } : PersistenceHandlerProps) => {
    const { getValues, formState, reset } = useFormContext();
    const { isSubmitting, isSubmitted} = formState;

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
                if (field.type === FIELD_TYPES.FILE) {
                    fileFields.push(field.key);
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
    }, [isSubmitted, isSubmitting]);


    //
    // Persistence handling
    //

    // register persistence handler or persist form
    useEffect(() => {
        // ignore persistence if it is disabled
        if (!activatePersistence) {
            return;
        }

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
    }, [activatePersistence, handlePersistForm]);

    // reset the form from local storage
    useEffect(() => {
        // ignore persistence if it is disabled
        if (!activatePersistence) {
            return;
        }

        // reset form if its the first render
        if (!isSubmitted && !isSubmitting && persistedLocalForm !== undefined) {
            reset(persistedLocalForm);
        }
    }, [activatePersistence, isSubmitting, isSubmitted]);

    // delete the entry from local storage after submission
    useEffect(() => {
        // remove persisted form when it was submitted
        if (isSubmitted && activatePersistence) {
            localStorage.removeItem(persistenceKey);
        }
    }, [activatePersistence, isSubmitted]);

    return <></>
}

export default PersistenceHandler;