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
import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Event } from '@mui/icons-material';
import { DateTimePicker as MUIDateTimePicker } from '@mui/lab';
import { useController, useFormContext } from 'react-hook-form';
import { getHighlightBackgroundColor, shouldHighlightBackground, shouldShowRequiredLabel, } from '../util';
export function DateTimePicker(_a) {
    var customProperties = _a.customProperties, fieldId = _a.fieldId, _b = _a.uiSettings, disabled = _b.disabled, description = _b.description, label = _b.label, placeholder = _b.placeholder, size = _b.size, variant = _b.variant, validation = _a.validation;
    var field = useController({
        name: fieldId,
        rules: Object.assign({ disabled: disabled }, validation),
    }).field;
    var ref = field.ref, value = field.value, onChange = field.onChange, rest = __rest(field, ["ref", "value", "onChange"]);
    var formState = useFormContext().formState;
    var required = validation.required;
    var errors = formState.errors;
    var disableFuture = (customProperties !== null && customProperties !== void 0 ? customProperties : { disableFuture: false }).disableFuture;
    // derived state
    var error = errors[fieldId];
    var isErroneous = error !== undefined;
    var isRequired = required !== false;
    var highlightBackground = shouldHighlightBackground(value, isRequired, disabled);
    var showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);
    var handleChange = function (dateTimeObject) {
        if (dateTimeObject !== null && !isNaN(dateTimeObject.getTime())) {
            onChange(dateTimeObject.toISOString());
        }
    };
    return (_jsx(MUIDateTimePicker, __assign({ ampm: false, clearable: true, disabled: disabled, disableFuture: disableFuture, renderInput: function (props) { return (_jsx(TextField, __assign({}, props, { InputLabelProps: { required: showRequiredLabel, shrink: true }, fullWidth: true, helperText: isErroneous ? error.message : description, placeholder: placeholder, size: size, variant: variant }), void 0)); }, inputFormat: "yyyy/MM/dd, HH:mm", mask: "____/__/__, __:__", InputProps: {
            endAdornment: (_jsx(InputAdornment, __assign({ position: "end" }, { children: _jsx(IconButton, { children: _jsx(Event, {}, void 0) }, void 0) }), void 0)),
            sx: function (theme) { return ({
                backgroundColor: getHighlightBackgroundColor(theme, highlightBackground),
            }); },
        }, inputRef: ref, label: label, value: value === '' ? null : value, onChange: handleChange }, rest), void 0));
}
export default DateTimePicker;
