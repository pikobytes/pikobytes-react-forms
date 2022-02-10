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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { alpha, FormControl, FormHelperText, InputLabel, Select as MUISelect, } from '@mui/material';
import { useController, useFormContext } from "react-hook-form";
var EMPTY_VALUE = "none";
export default function Select(_a) {
    var _b = _a.customProperties, options = _b.options, registerReturn = _b.registerReturn, fieldId = _a.fieldId, _c = _a.uiSettings, label = _c.label, placeholder = _c.placeholder, size = _c.size, variant = _c.variant, validation = _a.validation;
    var register = useFormContext().register;
    if (register === undefined && registerReturn === undefined) {
        throw new Error('Either register or registerReturn must be supplied');
    }
    var required = validation.required;
    var field = useController({ name: fieldId, rules: validation }).field;
    var onChange = field.onChange, onBlur = field.onBlur, ref = field.ref, value = field.value;
    var formState = useFormContext().formState;
    var errors = formState.errors;
    var error = errors[fieldId];
    var isErroneous = error !== undefined;
    var highlightBackground = required && value === "";
    var handleChange = function (e) {
        if (e.target.value === EMPTY_VALUE) {
            onChange("");
        }
        else {
            onChange(e.target.value);
        }
    };
    return (_jsxs(FormControl, __assign({ error: isErroneous, fullWidth: true, required: required !== false, size: size, variant: variant }, { children: [_jsx(InputLabel, __assign({ htmlFor: label, shrink: true }, { children: label }), void 0), _jsxs(MUISelect, __assign({ onBlur: onBlur, onChange: handleChange, inputRef: ref, label: label, native: true, value: value === "" ? EMPTY_VALUE : value, sx: function (theme) { return ({
                    backgroundColor: highlightBackground
                        ? alpha(theme.palette.error.light, 0.35)
                        : theme.palette.background.default
                }); } }, { children: [_jsx("option", __assign({ value: EMPTY_VALUE, disabled: value !== EMPTY_VALUE }, { children: placeholder }), void 0), options === null || options === void 0 ? void 0 : options.map(function (_a) {
                        var label = _a.label, value = _a.value, helperText = _a.helperText;
                        return (_jsx("option", __assign({ title: helperText, value: value }, { children: label }), label));
                    })] }), void 0), isErroneous && _jsx(FormHelperText, { children: error === null || error === void 0 ? void 0 : error.message }, void 0)] }), fieldId));
}
