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
import { alpha, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { mapField } from '../../util/fieldMapper';
import { E_CONDITION_EFFECTS } from '../../typedefs/ConditionalFields';
import { applyConditions } from '../Form/util/conditionMatching';
import { resolveValidationFunctions } from '../Form/util/util';
export var Section = function (_a) {
    var customMapping = _a.customMapping, fieldConfigs = _a.fieldConfigs, fields = _a.fields, loadingFields = _a.loadingFields, title = _a.title, uiSettings = _a.uiSettings, variant = _a.variant, validationFunctionLookup = _a.validationFunctionLookup;
    var getValues = useFormContext().getValues;
    return (_jsxs(Grid, __assign({ container: true, direction: "row", alignItems: "center", spacing: 2, sx: { paddingBottom: 4 } }, { children: [title !== undefined && (_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(Typography, __assign({ color: "primary", variant: "h3", sx: function (theme) { return ({
                        fontWeight: 500,
                        fontSize: 20,
                        textTransform: 'uppercase',
                        borderBottom: '1px solid ' + alpha(theme.palette.primary.main, 0.3),
                        mt: 3,
                        mb: 1,
                    }); } }, { children: title }), void 0) }), void 0)), fields.map(function (field) {
                var _a;
                var fieldConfig;
                try {
                    fieldConfig = fieldConfigs[field];
                }
                catch (e) {
                    console.error("Error trying to access configuration for field \"".concat(field, "\". Check if it is defined in the configuration."));
                    throw new Error('Invalid configuration.');
                }
                var condition = fieldConfig.condition, customProperties = fieldConfig.customProperties, fieldType = fieldConfig.fieldType, validation = fieldConfig.validation;
                var fieldUiSettings = uiSettings[field];
                var loading = loadingFields !== undefined && loadingFields.includes(field);
                var _b = applyConditions(getValues(), condition), effect = _b.effect, isMet = _b.isMet;
                var FieldComponent = mapField(fieldType, customMapping);
                var uiSettingsWithConditionsApplied = Object.assign({}, {
                    disabled: effect === E_CONDITION_EFFECTS.ENABLE && !isMet,
                    variant: variant,
                }, fieldUiSettings);
                var _c = validation !== null && validation !== void 0 ? validation : {}, validationFunctions = _c.validationFunctions, rest = __rest(_c, ["validationFunctions"]);
                var validationRules = Object.assign(rest, resolveValidationFunctions(validationFunctionLookup, validationFunctions));
                return (effect === E_CONDITION_EFFECTS.DISPLAY && isMet) ||
                    effect !== E_CONDITION_EFFECTS.DISPLAY ? (_jsx(Grid, __assign({ item: true, xs: (_a = fieldUiSettings.columns) !== null && _a !== void 0 ? _a : 12 }, { children: _jsx(FieldComponent, { customProperties: customProperties, fieldId: field, fieldType: fieldType, loading: loading, uiSettings: uiSettingsWithConditionsApplied, validation: validationRules }, void 0) }), field)) : (_jsx(_Fragment, {}, void 0));
            })] }), void 0));
};
