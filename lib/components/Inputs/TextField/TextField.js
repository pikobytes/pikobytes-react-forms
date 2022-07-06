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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React, { useRef } from 'react';
import { CircularProgress, InputAdornment, TextField as MUITextField, } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import FIELD_TYPES from '../../../typedefs/FieldTypes';
import { getHighlightBackgroundColor, shouldHighlightBackground, shouldShowRequiredLabel, } from '../util';
function getHTMLType(fieldType) {
    switch (fieldType) {
        case FIELD_TYPES.NUMBER:
            return 'number';
        case FIELD_TYPES.STRING:
            return 'text';
        case FIELD_TYPES.FILE:
            return 'file';
        default:
            return fieldType;
    }
}
export default function TextField(props) {
    var customProperties = props.customProperties, fieldId = props.fieldId, _a = props.endAdornments, endAdornments = _a === void 0 ? [] : _a, fieldType = props.fieldType, loading = props.loading, _b = props.uiSettings, disabled = _b.disabled, description = _b.description, label = _b.label, placeholder = _b.placeholder, size = _b.size, variant = _b.variant, validation = props.validation;
    var register = useFormContext().register;
    // ref
    var fieldRef = useRef(null);
    var _c = customProperties !== null && customProperties !== void 0 ? customProperties : {}, registerReturn = _c.registerReturn, rows = _c.rows, otherCustomProperties = __rest(_c, ["registerReturn", "rows"]);
    var required = (validation !== null && validation !== void 0 ? validation : {}).required;
    if (register === undefined && registerReturn === undefined) {
        throw new Error('Either register or registerReturn must be supplied');
    }
    var formState = useFormContext().formState;
    var errors = formState.errors;
    var error = errors[fieldId];
    var _d = register !== undefined
        ? register(fieldId, Object.assign({ disabled: disabled, shouldUnregister: true }, validation))
        : registerReturn, ref = _d.ref, rest = __rest(_d, ["ref"]);
    var isErroneous = error !== undefined;
    var isRequired = required !== false;
    var highlightBackground = fieldRef !== null &&
        fieldRef.current !== null &&
        shouldHighlightBackground(fieldRef.current.value, isRequired, disabled);
    var showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);
    return (_jsx(React.Fragment, { children: _jsx(MUITextField, { disabled: disabled, error: isErroneous, helperText: isErroneous ? error.message : description, inputRef: function (e) {
                ref(e);
                fieldRef.current = e;
            }, label: label, multiline: fieldType === FIELD_TYPES.TEXTFIELD, inputProps: __assign(__assign({}, otherCustomProperties), rest), InputProps: {
                endAdornment: (_jsxs(React.Fragment, { children: [loading && (_jsx(InputAdornment, __assign({ position: "start" }, { children: _jsx(CircularProgress, { variant: "indeterminate" }) }))), endAdornments.map(function (EndAdornment, index) { return (_jsx(InputAdornment, __assign({ position: "start" }, { children: _jsx(EndAdornment, {}) }), index)); })] })),
            }, rows: rows, name: fieldId, placeholder: placeholder === undefined ? label : placeholder, fullWidth: true, size: size, InputLabelProps: { required: showRequiredLabel, shrink: true }, type: getHTMLType(fieldType), variant: variant, sx: function (theme) { return ({
                backgroundColor: getHighlightBackgroundColor(theme, highlightBackground),
            }); } }, fieldId) }));
}
