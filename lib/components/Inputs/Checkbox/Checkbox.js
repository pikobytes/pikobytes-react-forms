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
import { Checkbox as MUICheckBox, FormControl, FormControlLabel, FormGroup, FormHelperText, } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { getHighlightBackgroundColor } from '../util';
export default function Checkbox(props) {
    var _a;
    var fieldId = props.fieldId, _b = props.uiSettings, disabled = _b.disabled, label = _b.label, size = _b.size, validation = props.validation;
    var required = validation.required;
    var formState = useFormContext().formState;
    var field = useController({
        name: fieldId,
        rules: Object.assign({ disabled: disabled }, validation),
    }).field;
    var errors = formState.errors;
    var error = errors[fieldId];
    var isErroneous = error !== undefined;
    var isRequired = required !== false;
    var highlightBackground = field.value !== true && isRequired;
    return (_jsxs(FormControl, __assign({ disabled: disabled, error: isErroneous, fullWidth: true, required: isRequired, size: size }, { children: [_jsx(FormGroup, { children: _jsx(FormControlLabel, { control: _jsx(MUICheckBox, __assign({}, field, { checked: (_a = field.value) !== null && _a !== void 0 ? _a : false, onChange: function (e) {
                            field.onChange(e.target.checked);
                        } })), label: label !== null && label !== void 0 ? label : '', sx: function (theme) { return ({
                        backgroundColor: getHighlightBackgroundColor(theme, highlightBackground),
                    }); } }) }), isErroneous && _jsx(FormHelperText, { children: error.message })] })));
}
