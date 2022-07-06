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
    var _b = _a.customProperties, options = _b.options, registerReturn = _b.registerReturn, fieldId = _a.fieldId, _c = _a.uiSettings, disabled = _c.disabled, description = _c.description, label = _c.label, placeholder = _c.placeholder, size = _c.size, variant = _c.variant, validation = _a.validation;
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
        onChange(newValue.value);
    };
    var formState = useFormContext().formState;
    var errors = formState.errors;
    var error = errors[fieldId];
    var isErroneous = error !== undefined;
    var isRequired = required !== false;
    var showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);
    var highlightBackground = shouldHighlightBackground(value, isRequired, disabled);
    return _jsx(MUIAutocomplete, { fullWidth: true, size: size, disabled: disabled, id: 'combo-box-demo', options: options, onChange: handleChange, renderInput: function (params) { return _createElement(TextField, __assign({}, params, { error: isErroneous, helperText: isErroneous ? error.message : description, label: label, placeholder: placeholder, InputLabelProps: { required: showRequiredLabel, shrink: true }, onBlur: onBlur, inputRef: ref, variant: variant, key: fieldId, name: fieldId })); }, renderOption: function (props, option, _a) {
            var inputValue = _a.inputValue;
            var matches = match(option.label, inputValue);
            var parts = parse(option.label, matches);
            return (_jsx("li", __assign({}, props, { children: _jsx("div", { children: parts.map(function (part, index) { return (_jsx("span", __assign({ style: {
                            fontWeight: part.highlight ? 700 : 400,
                        } }, { children: part.text }), index)); }) }) })));
        }, sx: function (theme) { return ({
            backgroundColor: getHighlightBackgroundColor(theme, highlightBackground),
        }); } });
};
export default Autocomplete;
