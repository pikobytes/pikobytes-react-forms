/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, {
    useEffect, useMemo,
    useState,
} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {alpha, Grid, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";

import {IDefaultUiSettings, IGenericField} from '../../typedefs/IField';
import {joinInCustomValidation} from '../../util/validation';
import FormErrorFallback from '../FormErrorFallback/FormErrorFallback';
import {usePrevious} from "../../hooks";
import PersistenceHandler from "./components/PersistenceHandler/PersistenceHandler";
import {mapField} from "../../util/fieldMapper";
import {
    validateFieldConfiguration,
    validateUiConfiguration
} from "../../util/ConfigurationParser";

interface FormProps {
    activatePersistence?: boolean;
    configuration: Object,
    uiConfiguration: Object,
    customMapping?: { [key: string]: React.ComponentType<IGenericField<IDefaultUiSettings, any>> },
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
    variant?: 'filled' | 'outlined' | 'standard';
}

const MANUAL_DIRTY_TRIGGER_ID = "MANUAL_DIRTY_TRIGGER"

const cloneValues = (val: any) =>
    typeof val === 'object' && val !== null ? Object.assign({}, val) : val;

export default function Form(props: FormProps) {
    const {
        activatePersistence = false,
        configuration,
        uiConfiguration,
        customMapping,
        fieldsToWatch,
        formId,
        initialValues,
        loadingFields,
        onPublishValues,
        onSetIsDirty,
        onSubmit,
        onUpdateResetForm,
        persistenceKey,
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
    const {dirtyFields} = formState;

    const isDirty = Object.keys(dirtyFields).length > 0;

    const fieldValues =
        fieldsToWatch === undefined
            ? undefined
            : watch(fieldsToWatch).map(cloneValues);

    const previousFieldValues = usePrevious(fieldValues);

    // register manual dirty trigger value
    formMethods.register(MANUAL_DIRTY_TRIGGER_ID);

    const fieldConfigs = useMemo(() => validateFieldConfiguration(configuration), [configuration]);
    const uiSettings = useMemo(() => validateUiConfiguration(uiConfiguration), [uiConfiguration]);

    const sections = uiSettings.sections ?? [{fields: Object.keys(fieldConfigs)}];

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
    }, [blockPublish, fieldValues, onPublishValues, previousFieldValues, setValue]);

    //
    // Outside propagation
    //

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

    // update initial values of the form if the supplied initial values change
    useEffect(() => {
            setBlockPublish(true);
            reset(initialValues, {keepValues: true});

            // the "isDirty" - check is triggered by a change/blur
            //  -> focus and blur field in order to trigger an update of isDirty after
            //  receiving new initial Values
        },
        [initialValues, reset]);


    return (
        <ErrorBoundary FallbackComponent={FormErrorFallback} onReset={handleReset}>
            <FormProvider {...formMethods}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <>
                        <PersistenceHandler activatePersistence={activatePersistence}
                                            fieldConfigs={fieldConfigs}
                                            persistenceKey={persistenceKey}
                                            sections={sections}/>
                        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                            {sections.map(
                                ({title, fields}, index) => {
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
                                                const {customProperties, fieldType, validation} = fieldConfigs[field];

                                                const {
                                                    customValidationFunctions,
                                                    ...rest
                                                } = validation;


                                                const loading = loadingFields !== undefined && loadingFields.includes(field);

                                                const validationRules = {
                                                    ...(customValidationFunctions !== undefined &&
                                                        joinInCustomValidation(customValidationFunctions)),
                                                    ...rest,
                                                };

                                                const FieldComponent = mapField(fieldType, customMapping)

                                                return (
                                                    <FieldComponent
                                                        customProperties={customProperties}
                                                        loading={loading}
                                                        fieldId={field}
                                                        fieldType={fieldType}
                                                        uiSettings={Object.assign({}, {variant}, uiSettings[field])}
                                                        validation={validationRules}
                                                    />
                                                );
                                            })}
                                        </Grid>
                                    );
                                }
                            )}
                        </form>
                    </>
                </LocalizationProvider>
            </FormProvider>
        </ErrorBoundary>
    );
}
