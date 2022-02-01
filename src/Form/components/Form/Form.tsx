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
import {useForm} from 'react-hook-form';
import {Grid, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import {IField, ISection} from '../../typedefs/IField';
import {joinInCustomValidation} from '../../util/validation';
import FIELD_TYPES from '../../typedefs/FieldTypes';
import FormErrorFallback from '../FormErrorFallback/FormErrorFallback';
import {usePrevious} from "../../hooks";
import PersistenceHandler from "./components/PersistenceHandler/PersistenceHandler";

interface FormProps {
    activatePersistence: boolean;
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
    onUpdateResetForm: (e: any) => void;
    sections: Array<ISection>;
    variant?: 'filled' | 'outlined' | 'standard';
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     formHeadlines: {
//       fontWeight: 500,
//       fontSize: 20,
//       textTransform: 'uppercase',
//       borderBottom: '1px solid ' + alpha(theme.palette.primary.main, 0.3),
//       margin: theme.spacing(3, 0, 1, 0),
//     },
//     gridSection: {
//       paddingBottom: theme.spacing(4),
//     },
//     hiddenInput: {
//       height: 0,
//       opacity: 0,
//       position: 'absolute',
//       right: 0,
//       tabIndex: -1,
//       top: 0,
//       width: 0,
//     },
//   })
// );

const IS_DIRTY_CHECKER_ID = 'isDirtyChecker';

const cloneValues = (val: any) =>
    typeof val === 'object' && val !== null ? Object.assign({}, val) : val;

export const PERSISTED_FORM_LOCAL_STORAGE_KEY = 'upload_form';

export default function Form(props: FormProps) {
    const {
        activatePersistence,
        FieldComponent,
        fieldsToWatch,
        formId,
        initialValues,
        loadingFields,
        onPublishValues,
        onSetIsDirty,
        onSubmit,
        onUpdateResetForm,
        sections,
        variant,
    } = props;

    const {
        clearErrors,
        control,
        getValues,
        formState,
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
        watch,
    } = useForm({
        defaultValues: Object.assign(initialValues, {[IS_DIRTY_CHECKER_ID]: ''}),
        shouldUnregister: true,
    });
    const [blockPublish, setBlockPublish] = useState<boolean>(false);
    const isDirtyChecker = useRef<HTMLInputElement | undefined>(undefined);
    const {errors, isDirty, isSubmitted, isSubmitting} = formState;
    const {ref, ...rest} = register('isDirtyChecker');

    const fieldValues =
        fieldsToWatch === undefined
            ? undefined
            : watch(fieldsToWatch).map(cloneValues);

    const previousFieldValues = usePrevious(fieldValues);

    //
    // Handler section
    //

    const handleDirtyForm = (dirty = true) => {
        if (dirty) {
            setValue(IS_DIRTY_CHECKER_ID, 'a', {shouldDirty: true});
        } else {
            setValue(IS_DIRTY_CHECKER_ID, '', {shouldDirty: true});
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
        } else if (fieldValues !== undefined && previousFieldValues !== undefined) {
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
        onSetIsDirty(isDirty);
    }, [isDirty]);

    // propagate reset function to outside components
    useEffect(() => {
        onUpdateResetForm(reset);
    }, [onUpdateResetForm, reset]);

    // update initial values of the form if the supplied initial values change
    useEffect(() => {
        setBlockPublish(true);
        reset(initialValues, {keepValues: true});

        // the "isDirty" - check is triggered by a change/blur
        //  -> focus and blur field in order to trigger an update of isDirty after
        //  receiving new initial Values
        if (isDirtyChecker !== undefined && isDirtyChecker?.current !== undefined) {
            isDirtyChecker.current.focus();
            isDirtyChecker.current.blur();
        }
    }, [initialValues]);


    return (
        <ErrorBoundary FallbackComponent={FormErrorFallback} onReset={handleReset}>
            <>
                <PersistenceHandler activatePersistence={activatePersistence} getValues={getValues}
                                    isSubmitting={isSubmitting} isSubmitted={isSubmitted} reset={reset}
                                    sections={sections}/>
                <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        ref={(el) => {
                            if (el !== null) isDirtyChecker.current = el;
                            ref(el);
                        }}
                        {...rest}
                    />
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
                                >
                                    {title !== undefined && (
                                        <Grid item xs={12}>
                                            <Typography
                                                color="primary"
                                                variant="h3"
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

                                        const error = errors[field.key];
                                        const loading = loadingFields.includes(field.key);

                                        const validationRules = {
                                            ...(customValidationFunctions !== undefined &&
                                                joinInCustomValidation(customValidationFunctions)),
                                            ...rest,
                                        };

                                        return (
                                            <FieldComponent
                                                key={field.key}
                                                control={control}
                                                defaultValue={initialValues[field.key] ?? ''}
                                                error={error}
                                                loading={loading}
                                                onResetError={clearErrors}
                                                onSetError={setError}
                                                field={field}
                                                rules={
                                                    field.type === FIELD_TYPES.GEOMETRY
                                                        ? validationRules
                                                        : undefined
                                                }
                                                register={(name: string) =>
                                                    register(name, validationRules)
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
        </ErrorBoundary>
    );
}
