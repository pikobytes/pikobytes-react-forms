/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, {
    FunctionComponent,
    useEffect,
    useRef,
    useState,
} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {alpha, Grid, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import {IField, ISection} from '../../typedefs/IField';
import {joinInCustomValidation} from '../../util/validation';
import FIELD_TYPES from '../../typedefs/FieldTypes';
import FormErrorFallback from '../FormErrorFallback/FormErrorFallback';
import {usePrevious} from "../../hooks";
import PersistenceHandler from "./components/PersistenceHandler/PersistenceHandler";

interface FormProps {
    activatePersistence?: boolean;
    FieldComponent: FunctionComponent<any>;
    fieldsToWatch: Array<string>;
    formId: string;
    initialValues: {
        [key: string]: string;
    };
    loadingFields: Array<string>;
    onPublishValues: (
        fieldValues: Array<string>,
        previousFieldValues: Array<string>,
        options: { setValue: (field: string, newValue: string) => void }
    ) => void;
    onSetIsDirty: (isDirty: boolean) => void;
    onSubmit: (data: any) => void;
    onUpdateResetForm?: (e: any) => void;
    persistenceKey: string;
    sections: Array<ISection>;
    variant?: 'filled' | 'outlined' | 'standard';
}

const MANUAL_DIRTY_TRIGGER_ID = "MANUAL_DIRTY_TRIGGER"

const cloneValues = (val: any) =>
    typeof val === 'object' && val !== null ? Object.assign({}, val) : val;

export default function Form(props: FormProps) {
    const {
        activatePersistence = false,
        FieldComponent,
        fieldsToWatch,
        formId,
        initialValues,
        loadingFields,
        onPublishValues,
        onSetIsDirty,
        onSubmit,
        onUpdateResetForm,
        persistenceKey,
        sections,
        variant,
    } = props;

    const formMethods = useForm({
        defaultValues: Object.assign({[MANUAL_DIRTY_TRIGGER_ID]: ""}, initialValues),
        shouldUnregister: true,
    });

    const {
        formState,
        handleSubmit,
        reset,
        setValue,
        watch,
    } = formMethods;
    const [blockPublish, setBlockPublish] = useState<boolean>(false);
    const { dirtyFields } = formState;

    const isDirty = Object.keys(dirtyFields).length > 0;

    const fieldValues =
        fieldsToWatch === undefined
            ? undefined
            : watch(fieldsToWatch).map(cloneValues);

    const previousFieldValues = usePrevious(fieldValues);

    // register manual dirty trigger value
    formMethods.register(MANUAL_DIRTY_TRIGGER_ID);

    //
    // Handler section
    //

    const handleDirtyForm = (dirty = true) => {
        if (dirty) {
            setValue(MANUAL_DIRTY_TRIGGER_ID, 'a', {shouldDirty: true});
        } else {
            setValue(MANUAL_DIRTY_TRIGGER_ID, '', {shouldDirty: true});
        }
    };

    const handleReset = () => {
        reset();
    };

    //
    // Effect section
    //

    useEffect(() => {
        // resetting the initial values after a change of form type leads to a
        // change in form values:
        // 1. Initially selected form type: "Raw Data"
        // 2. Update to form type: "Product"
        // 3. Change of values to initial values -> First update
        // 4. Change of values back to correct values -> Second update
        // The first update doesnt matter, thus we just block it, by setting the
        // block flag to true, after the reset of the form values

        if (blockPublish) {
            setBlockPublish(false);
        } else if (fieldValues !== undefined && previousFieldValues !== undefined && onPublishValues !== undefined) {
            onPublishValues(fieldValues as string[], previousFieldValues, {
                setValue,
            });
        }
    }, [blockPublish, fieldValues]);

    //
    // Outside propagation
    //

    // propagate isDirty changes to outside components
    useEffect(() => {
        if(onSetIsDirty){
        onSetIsDirty(isDirty);
        }
    }, [isDirty]);

    // propagate reset function to outside components
    useEffect(() => {
        if(onUpdateResetForm !== undefined){
        onUpdateResetForm(reset);
        }
    }, [onUpdateResetForm, reset]);

    // update initial values of the form if the supplied initial values change
    useEffect(() => {
            setBlockPublish(true);
            reset(initialValues, {keepValues: true});

            // the "isDirty" - check is triggered by a change/blur
            //  -> focus and blur field in order to trigger an update of isDirty after
            //  receiving new initial Values
    }, [initialValues]);


    return (
        <ErrorBoundary FallbackComponent={FormErrorFallback} onReset={handleReset}>
            <FormProvider {...formMethods}>
                <>
                    <PersistenceHandler activatePersistence={activatePersistence}
                                        persistenceKey={persistenceKey}
                                        sections={sections}/>
                    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                        {sections.map(
                            (
                                {title, fields}: { title: string; fields: Array<IField> },
                                index
                            ) => {
                                return (
                                    <Grid
                                        key={`${title}_${index}`}
                                        container
                                        direction="row"
                                        alignItems="flex-start"
                                        spacing={2}
                                        sx={{paddingBottom: 4}}
                                    >
                                        {title !== undefined && (
                                            <Grid item xs={12}>
                                                <Typography
                                                    color="primary"
                                                    variant="h3"
                                                    sx={theme => ({
                                                        fontWeight: 500,
                                                        fontSize: 20,
                                                        textTransform: 'uppercase',
                                                        borderBottom: '1px solid ' + alpha(theme.palette.primary.main, 0.3),
                                                        mt: 3,
                                                        mb: 1,
                                                    })}
                                                >
                                                    {title}
                                                </Typography>
                                            </Grid>
                                        )}
                                        {fields.map((field) => {
                                            const {
                                                customValidationFunctions,
                                                ...rest
                                            } = field.validation;

                                            const loading = loadingFields.includes(field.key);

                                            const validationRules = {
                                                ...(customValidationFunctions !== undefined &&
                                                    joinInCustomValidation(customValidationFunctions)),
                                                ...rest,
                                            };

                                            return (
                                                <FieldComponent
                                                    key={field.key}
                                                    defaultValue={initialValues[field.key] ?? ''}
                                                    loading={loading}
                                                    field={field}
                                                    rules={
                                                        field.type === FIELD_TYPES.GEOMETRY
                                                            ? validationRules
                                                            : undefined
                                                    }
                                                    setFormIsDirty={handleDirtyForm}
                                                    variant={variant}
                                                />
                                            );
                                        })}
                                    </Grid>
                                );
                            }
                        )}
                    </form>
                </>
            </FormProvider>
        </ErrorBoundary>
    );
}
