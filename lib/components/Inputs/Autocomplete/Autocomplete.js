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
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
/**
 * Created by nicolas.looschen@pikobytes.de on 06.07.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { getHighlightBackgroundColor, shouldHighlightBackground, shouldShowRequiredLabel } from '../util';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
export var Autocomplete = function (_a) {
    var _b;
    var _c = _a.customProperties, _d = _c.options, options = _d === void 0 ? [] : _d, registerReturn = _c.registerReturn, fieldId = _a.fieldId, _e = _a.uiSettings, disabled = _e.disabled, description = _e.description, label = _e.label, placeholder = _e.placeholder, size = _e.size, variant = _e.variant, validation = _a.validation;
    var register = useFormContext().register;
    if (register === undefined && registerReturn === undefined) {
        throw new Error('Either register or registerReturn must be supplied');
    }
    var required = validation.required;
    var field = useController({
        name: fieldId,
        rules: Object.assign({ disabled: disabled }, validation),
    }).field;
    var onChange = field.onChange, onBlur = field.onBlur, ref = field.ref, value = field.value;
    var handleChange = function (e, newValue, reason) {
        var _a;
        onChange((_a = newValue === null || newValue === void 0 ? void 0 : newValue.value) !== null && _a !== void 0 ? _a : '');
    };
    var formState = useFormContext().formState;
    var errors = formState.errors;
    var error = errors[fieldId];
    var isErroneous = error !== undefined;
    var isRequired = required !== false;
    var showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);
    var highlightBackground = shouldHighlightBackground(value, isRequired, disabled);
    return _jsx(MUIAutocomplete, { disabled: disabled, fullWidth: true, id: 'combo-box-demo', options: options, onBlur: onBlur, onChange: handleChange, renderInput: function (params) {
            return _createElement(TextField, __assign({}, params, { error: isErroneous, helperText: isErroneous ? error.message : description, InputLabelProps: { required: showRequiredLabel, shrink: true }, key: fieldId, label: label, name: fieldId, placeholder: placeholder, variant: variant }));
        }, renderOption: function (props, option, _a) {
            var inputValue = _a.inputValue;
            var matches = match(option.label, inputValue);
            var parts = parse(option.label, matches);
            return (_jsx("li", __assign({}, props, { children: _jsx("div", { children: parts.map(function (part, index) { return (_jsx("span", __assign({ style: {
                            fontWeight: part.highlight ? 700 : 400,
                        } }, { children: part.text }), index)); }) }) })));
        }, size: size, sx: function (theme) { return ({
            backgroundColor: getHighlightBackgroundColor(theme, highlightBackground),
        }); }, value: (_b = options.find(function (option) { return option.value === value; })) !== null && _b !== void 0 ? _b : null });
};
export default Autocomplete;
