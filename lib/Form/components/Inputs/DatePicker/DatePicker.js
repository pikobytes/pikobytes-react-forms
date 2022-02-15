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
import { alpha, IconButton, InputAdornment, TextField, } from '@mui/material';
import { Event } from '@mui/icons-material';
import { DatePicker as MUIDatePicker } from '@mui/lab';
import { useController, useFormContext } from 'react-hook-form';
export function DatePicker(_a) {
    var fieldId = _a.fieldId, _b = _a.uiSettings, disabled = _b.disabled, description = _b.description, label = _b.label, placeholder = _b.placeholder, size = _b.size, variant = _b.variant, validation = _a.validation;
    var field = useController({ name: fieldId, rules: Object.assign({ disabled: disabled }, validation) }).field;
    var ref = field.ref, value = field.value, onChange = field.onChange, rest = __rest(field, ["ref", "value", "onChange"]);
    var formState = useFormContext().formState;
    var required = validation.required;
    var errors = formState.errors;
    var error = errors[fieldId];
    var highlightBackground = required && value === '' && !disabled;
    return (_jsx(MUIDatePicker, __assign({ clearable: true, disabled: disabled, renderInput: function (props) { return _jsx(TextField, __assign({}, props, { InputLabelProps: { required: required !== false, shrink: true }, fullWidth: true, helperText: error !== undefined ? error.message : description, placeholder: placeholder, size: size, variant: variant }), void 0); }, disableFuture: true, inputFormat: "yyyy/MM/dd", mask: "____/__/__", InputProps: {
            endAdornment: (_jsx(InputAdornment, __assign({ position: "end" }, { children: _jsx(IconButton, { children: _jsx(Event, {}, void 0) }, void 0) }), void 0)),
            sx: function (theme) { return ({
                backgroundColor: highlightBackground
                    ? alpha(theme.palette.error.light, 0.35)
                    : theme.palette.background.default
            }); }
        }, inputRef: ref, label: label, value: value === '' ? null : value, onChange: function (dateTimeObject) {
            if (dateTimeObject !== null && !isNaN(dateTimeObject.getTime())) {
                // publish string to form state instead of datetime object
                // @ts-ignore
                onChange(dateTimeObject.toISOString().split("T")[0]);
            }
        } }, rest), void 0));
}
export default DatePicker;
