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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { alpha, Grid, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import { joinInCustomValidation } from "../../util/validation";
import FormErrorFallback from "../FormErrorFallback/FormErrorFallback";
import { usePrevious } from "../../hooks";
import PersistenceHandler from "./components/PersistenceHandler/PersistenceHandler";
import { mapField } from "../../util/fieldMapper";
import { validateFieldConfiguration, validateUiConfiguration } from "../../util/ConfigurationParser";
import { applyConditions, cloneValues, getDefaultValues } from "./util";
export var MANUAL_DIRTY_TRIGGER_ID = "MANUAL_DIRTY_TRIGGER";
var filterOutInternalFields = function (internalValues) {
    var MANUAL_DIRTY_TRIGGER = internalValues.MANUAL_DIRTY_TRIGGER, values = __rest(internalValues, ["MANUAL_DIRTY_TRIGGER"]);
    return values;
};
export function Form(props) {
    var _a;
    var _b = props.activatePersistence, activatePersistence = _b === void 0 ? false : _b, configuration = props.configuration, uiConfiguration = props.uiConfiguration, customMapping = props.customMapping, fieldsToWatch = props.fieldsToWatch, formId = props.formId, initialValues = props.initialValues, loadingFields = props.loadingFields, onError = props.onError, onPublishValues = props.onPublishValues, onSetIsDirty = props.onSetIsDirty, onSubmit = props.onSubmit, onUpdateResetForm = props.onUpdateResetForm, persistenceKey = props.persistenceKey, variant = props.variant;
    var _c = useState(false), blockPublish = _c[0], setBlockPublish = _c[1];
    var fieldConfigs = useMemo(function () { return validateFieldConfiguration(configuration); }, [configuration]);
    var uiSettings = useMemo(function () { return validateUiConfiguration(uiConfiguration); }, [uiConfiguration]);
    var defaultValues = getDefaultValues(initialValues, fieldConfigs);
    var formMethods = useForm({
        defaultValues: defaultValues,
        shouldUnregister: true
    });
    var formState = formMethods.formState, getValues = formMethods.getValues, handleSubmit = formMethods.handleSubmit, reset = formMethods.reset, setValue = formMethods.setValue, watch = formMethods.watch;
    var dirtyFields = formState.dirtyFields, errors = formState.errors;
    var isDirty = Object.keys(dirtyFields).length > 0;
    var fieldValues = fieldsToWatch === undefined
        ? undefined
        : watch(fieldsToWatch).map(cloneValues);
    var previousFieldValues = usePrevious(fieldValues);
    // register manual dirty trigger value
    formMethods.register(MANUAL_DIRTY_TRIGGER_ID);
    var sections = (_a = uiSettings.sections) !== null && _a !== void 0 ? _a : [{ fields: Object.keys(fieldConfigs) }];
    //
    // Handler section
    //
    var handleDirtyForm = function (dirty) {
        if (dirty === void 0) { dirty = true; }
        if (dirty) {
            setValue(MANUAL_DIRTY_TRIGGER_ID, "a", { shouldDirty: true });
        }
        else {
            setValue(MANUAL_DIRTY_TRIGGER_ID, "", { shouldDirty: true });
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
    useEffect(function () {
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
        }
        else if (fieldValues !== undefined && previousFieldValues !== undefined && onPublishValues !== undefined) {
            onPublishValues(fieldValues, previousFieldValues, {
                setValue: setValue
            });
        }
    }, [blockPublish, fieldValues, onPublishValues, previousFieldValues, setValue]);
    //
    // Outside propagation
    //
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
    return (_jsx(ErrorBoundary, __assign({ FallbackComponent: FormErrorFallback, onReset: handleReset }, { children: _jsx(FormProvider, __assign({}, formMethods, { children: _jsx(LocalizationProvider, __assign({ dateAdapter: AdapterDateFns }, { children: _jsxs(_Fragment, { children: [activatePersistence && _jsx(PersistenceHandler, { fieldConfigs: fieldConfigs, persistenceKey: persistenceKey !== null && persistenceKey !== void 0 ? persistenceKey : formId, sections: sections }, void 0), _jsx("form", __assign({ id: formId, onSubmit: handleSubmit(handleInternalSubmit) }, { children: sections.map(function (_a, index) {
                                var title = _a.title, fields = _a.fields;
                                return (_jsxs(Grid, __assign({ container: true, direction: "row", alignItems: "center", spacing: 2, sx: { paddingBottom: 4 } }, { children: [title !== undefined && (_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(Typography, __assign({ color: "primary", variant: "h3", sx: function (theme) { return ({
                                                    fontWeight: 500,
                                                    fontSize: 20,
                                                    textTransform: "uppercase",
                                                    borderBottom: "1px solid " + alpha(theme.palette.primary.main, 0.3),
                                                    mt: 3,
                                                    mb: 1
                                                }); } }, { children: title }), void 0) }), void 0)), fields.map(function (field) {
                                            var _a;
                                            var fieldConfig;
                                            try {
                                                fieldConfig = fieldConfigs[field];
                                            }
                                            catch (e) {
                                                console.error("Error trying to access configuration for field \"".concat(field, "\". Check if it is defined in the configuration."));
                                                throw new Error("Invalid configuration.");
                                            }
                                            var condition = fieldConfig.condition, customProperties = fieldConfig.customProperties, fieldType = fieldConfig.fieldType, validation = fieldConfig.validation;
                                            var fieldUiSettings = uiSettings[field];
                                            var _b = validation !== null && validation !== void 0 ? validation : {}, customValidationFunctions = _b.customValidationFunctions, rest = __rest(_b, ["customValidationFunctions"]);
                                            var loading = loadingFields !== undefined && loadingFields.includes(field);
                                            var validationRules = __assign(__assign({}, (customValidationFunctions !== undefined &&
                                                joinInCustomValidation(customValidationFunctions))), rest);
                                            var _c = applyConditions(getValues(), condition), type = _c.type, isMet = _c.isMet;
                                            var FieldComponent = mapField(fieldType, customMapping);
                                            return (_jsx(Grid, __assign({ item: true, xs: (_a = fieldUiSettings.columns) !== null && _a !== void 0 ? _a : 12 }, { children: _jsx(FieldComponent, { customProperties: customProperties, loading: loading, fieldId: field, fieldType: fieldType, uiSettings: Object.assign({}, { variant: variant }, fieldUiSettings), validation: validationRules }, void 0) }), field));
                                        })] }), "".concat(title, "_").concat(index)));
                            }) }), void 0)] }, void 0) }), void 0) }), void 0) }), void 0));
}
export default Form;
