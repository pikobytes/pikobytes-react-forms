var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ErrorBoundary } from 'react-error-boundary';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormErrorFallback from '../FormErrorFallback/FormErrorFallback';
import { usePrevious } from '../../util/hooks';
import PersistenceHandler from './components/PersistenceHandler/PersistenceHandler';
import { validateFieldConfiguration, validateUiConfiguration, } from '../../util/ConfigurationParser';
import { cloneValues, getDefaultValues, getDependentOnFields, } from './util/util';
import { Section } from '../Section/Section';
export var MANUAL_DIRTY_TRIGGER_ID = 'MANUAL_DIRTY_TRIGGER';
var filterOutInternalFields = function (internalValues) {
    var MANUAL_DIRTY_TRIGGER = internalValues.MANUAL_DIRTY_TRIGGER, values = __rest(internalValues, ["MANUAL_DIRTY_TRIGGER"]);
    return values;
};
export function Form(props) {
    var _a;
    var _b = props.activatePersistence, activatePersistence = _b === void 0 ? false : _b, configuration = props.configuration, uiConfiguration = props.uiConfiguration, customMapping = props.customMapping, fieldsToWatch = props.fieldsToWatch, formId = props.formId, initialValues = props.initialValues, loadingFields = props.loadingFields, onError = props.onError, onPublishValues = props.onPublishValues, onSetIsDirty = props.onSetIsDirty, onSubmit = props.onSubmit, onUpdateResetForm = props.onUpdateResetForm, persistenceKey = props.persistenceKey, variant = props.variant, validationFunctions = props.validationFunctions;
    var _c = useState(false), blockPublish = _c[0], setBlockPublish = _c[1];
    // initialize configs from props
    var fieldConfigs = useMemo(function () { return validateFieldConfiguration(configuration); }, [configuration]);
    var uiSettings = useMemo(function () { return validateUiConfiguration(uiConfiguration); }, [uiConfiguration]);
    // read default values from configuration
    var defaultValues = getDefaultValues(initialValues, fieldConfigs);
    // initialize form
    var formMethods = useForm({
        defaultValues: defaultValues,
        shouldUnregister: true,
    });
    // read form properties
    var formState = formMethods.formState, getValues = formMethods.getValues, handleSubmit = formMethods.handleSubmit, reset = formMethods.reset, setValue = formMethods.setValue, watch = formMethods.watch;
    var dirtyFields = formState.dirtyFields, errors = formState.errors;
    // derived state
    var isDirty = Object.keys(dirtyFields).length > 0;
    var fieldValues = fieldsToWatch === undefined
        ? undefined
        : watch(fieldsToWatch).map(cloneValues);
    var previousFieldValues = usePrevious(fieldValues);
    var sections = (_a = uiSettings.sections) !== null && _a !== void 0 ? _a : [
        { fields: Object.keys(fieldConfigs) },
    ];
    // register manual dirty trigger value
    formMethods.register(MANUAL_DIRTY_TRIGGER_ID);
    // trigger a rerender if the value of the dependent fields change
    var dependentOnFields = getDependentOnFields(fieldConfigs);
    var valuesOfDependentOnFields = watch(dependentOnFields);
    //
    // Handler section
    //
    var handleDirtyForm = function (dirty) {
        if (dirty === void 0) { dirty = true; }
        if (dirty) {
            setValue(MANUAL_DIRTY_TRIGGER_ID, 'a', { shouldDirty: true });
        }
        else {
            setValue(MANUAL_DIRTY_TRIGGER_ID, '', { shouldDirty: true });
        }
    };
    var handleInternalSubmit = function (values) {
        var externalValues = filterOutInternalFields(values);
        onSubmit(externalValues);
    };
    var handleReset = function () {
        reset();
    };
    //
    // Effect section
    //
    // update initial values of the form if the supplied initial values change
    useEffect(function () {
        setBlockPublish(true);
        reset(initialValues, { keepValues: true });
        // the "isDirty" - check is triggered by a change/blur
        //  -> focus and blur field in order to trigger an update of isDirty after
        //  receiving new initial Values
    }, [initialValues, reset]);
    // publish errors if there are any
    var errorLength = Object.keys(errors).length;
    useEffect(function () {
        if (errorLength > 0 && onError !== undefined) {
            onError(errors, filterOutInternalFields(getValues()));
        }
    }, [onError, errors, errorLength, getValues]);
    //
    // Outside propagation
    //
    // propagate watched fields
    useEffect(function () {
        if (blockPublish) {
            setBlockPublish(false);
        }
        else if (fieldValues !== undefined &&
            previousFieldValues !== undefined &&
            onPublishValues !== undefined) {
            onPublishValues(fieldValues, previousFieldValues, {
                setValue: setValue,
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
    useEffect(function () {
        if (onSetIsDirty) {
            onSetIsDirty(isDirty);
        }
    }, [isDirty, onSetIsDirty]);
    // propagate reset function to outside components
    useEffect(function () {
        if (onUpdateResetForm !== undefined) {
            onUpdateResetForm(reset);
        }
    }, [onUpdateResetForm, reset]);
    return (_jsx(ErrorBoundary, __assign({ FallbackComponent: FormErrorFallback, onReset: handleReset }, { children: _jsx(FormProvider, __assign({}, formMethods, { children: _jsx(LocalizationProvider, __assign({ dateAdapter: AdapterDateFns }, { children: _jsxs(_Fragment, { children: [activatePersistence && (_jsx(PersistenceHandler, { fieldConfigs: fieldConfigs, persistenceKey: persistenceKey !== null && persistenceKey !== void 0 ? persistenceKey : formId, sections: sections })), _jsx("form", __assign({ id: formId, onSubmit: handleSubmit(handleInternalSubmit) }, { children: sections.map(function (_a, index) {
                                var title = _a.title, fields = _a.fields;
                                return (_jsx(Section, { customMapping: customMapping, fieldConfigs: fieldConfigs, fields: fields, loadingFields: loadingFields, title: title, uiSettings: uiSettings, variant: variant, validationFunctionLookup: validationFunctions }, "".concat(title, "_").concat(index)));
                            }) }))] }) })) })) })));
}
export default Form;
