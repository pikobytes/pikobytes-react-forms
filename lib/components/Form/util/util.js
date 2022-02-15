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
/**
 * Created by nicolas.looschen@pikobytes.de on 04.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { MANUAL_DIRTY_TRIGGER_ID } from '../Form';
import FIELD_TYPES from '../../../typedefs/FieldTypes';
export var cloneValues = function (val) {
    return typeof val === 'object' && val !== null ? Object.assign({}, val) : val;
};
export var getDefaultValues = function (initialValues, fieldConfig) {
    var _a;
    // create empty default values for all fields without default values in the config
    var fieldKeys = Object.keys(fieldConfig);
    var defaultValues = {};
    fieldKeys.forEach(function (k) {
        var _a;
        defaultValues[k] =
            (_a = fieldConfig[k].defaultValue) !== null && _a !== void 0 ? _a : getDefaultValueForFieldType(fieldConfig[k].fieldType);
    });
    var definedInitialValues = {};
    if (initialValues !== undefined) {
        Object.entries(initialValues).forEach(function (_a) {
            var k = _a[0], v = _a[1];
            if (v !== undefined && v !== null) {
                definedInitialValues[k] = v;
            }
        });
    }
    // add default value for dirty trigger field, overwrite empty entries with initialValues
    return Object.assign((_a = {}, _a[MANUAL_DIRTY_TRIGGER_ID] = '', _a), defaultValues, definedInitialValues);
};
export var getDefaultValueForFieldType = function (fieldType) {
    switch (fieldType) {
        case FIELD_TYPES.BOOLEAN:
        case FIELD_TYPES.BOOL:
            return false;
        default:
            return '';
    }
};
export var getDependentOnFields = function (fieldConfigs) {
    var fieldsWithCondition = new Set();
    Object.values(fieldConfigs).forEach(function (fieldConfig) {
        if (fieldConfig.condition !== undefined) {
            var _a = fieldConfig.condition, effect = _a.effect, rest = __rest(_a, ["effect"]);
            Object.keys(rest).forEach(function (field) { return fieldsWithCondition.add(field); });
        }
    });
    var allFields = Object.keys(fieldConfigs);
    var dependentOnFields = Array.from(fieldsWithCondition);
    // instead of just checking if there exists a field which cannot be found
    // within the configuration, also print out which field could not be found
    dependentOnFields.forEach(function (dependentOnField) {
        if (!allFields.includes(dependentOnField)) {
            throw new Error("A condition depends on the field ".concat(dependentOnField, " which cannot be found in the supplied configuration."));
        }
    });
    return dependentOnFields;
};
export var resolveValidationFunctions = function (validationFunctionLookup, validationFunctions) {
    if (validationFunctions !== undefined) {
        var validate_1 = {};
        validationFunctions.forEach(function (validationFunction) {
            if (validationFunctionLookup !== undefined) {
                var fn = validationFunctionLookup[validationFunction];
                if (fn === undefined || typeof fn !== 'function') {
                    throw new Error("The validation function reference with ".concat(validationFunction, " is either not defined or invalid."));
                }
                else {
                    validate_1[validationFunction] = fn;
                }
            }
            else {
                throw new Error('The validation function lookup is empty. It has to be supplied to support validation Functions.');
            }
        });
        return { validate: validate_1 };
    }
    return {};
};
