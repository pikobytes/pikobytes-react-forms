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
import { E_CONDITION_EFFECTS, E_FIELD_CONDITION_TYPES } from "../../typedefs/IField";
import { MANUAL_DIRTY_TRIGGER_ID } from "./Form";
import FIELD_TYPES from "../../typedefs/FieldTypes";
export var cloneValues = function (val) {
    return typeof val === 'object' && val !== null ? Object.assign({}, val) : val;
};
var matchValueCondition = function (condition, fieldValue) {
    var value = condition.value;
    return value === fieldValue;
};
var matchValuesCondition = function (condition, fieldValue) {
    var value = condition.value;
    return value.includes(fieldValue);
};
var matchPatternCondition = function (condition, fieldValue) {
    var value = condition.value;
    var regexp = new RegExp(value);
    return regexp.test(fieldValue.toString());
};
var matchRangeCondition = function (condition, fieldValue) {
    var value = condition.value;
    return fieldValue >= value[0] && fieldValue <= value[1];
};
export var matchFieldCondition = function (condition, fieldValue) {
    switch (condition.type) {
        case E_FIELD_CONDITION_TYPES.VALUE:
            return matchValueCondition(condition, fieldValue);
        case E_FIELD_CONDITION_TYPES.VALUES:
            return matchValuesCondition(condition, fieldValue);
        case E_FIELD_CONDITION_TYPES.RANGE:
            return matchRangeCondition(condition, fieldValue);
        case E_FIELD_CONDITION_TYPES.PATTERN:
            return matchPatternCondition(condition, fieldValue);
        default:
            throw new Error("Unknown Condition Type.");
    }
};
export var applyConditions = function (fieldValues, conditions) {
    if (conditions === undefined) {
        return { effect: E_CONDITION_EFFECTS.DISPLAY, isMet: true };
    }
    else {
        var effect = conditions.effect, rest = __rest(conditions, ["effect"]);
        return {
            effect: effect, isMet: Object.entries(rest)
                .map(function (_a) {
                var field = _a[0], condition = _a[1];
                return matchFieldCondition(condition, fieldValues[field]);
            })
                .every(function (c) { return c; })
        };
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
    return Array.from(fieldsWithCondition);
};
export var getDefaultValueForFieldType = function (fieldType) {
    switch (fieldType) {
        case FIELD_TYPES.BOOLEAN:
        case FIELD_TYPES.BOOL:
            return false;
        default:
            return "";
    }
};
export var getDefaultValues = function (initialValues, fieldConfig) {
    var _a;
    // create empty default values for all fields without default values in the config
    var fieldKeys = Object.keys(fieldConfig);
    var defaultValues = {};
    fieldKeys.forEach(function (k) {
        var _a;
        defaultValues[k] = (_a = fieldConfig[k].defaultValue) !== null && _a !== void 0 ? _a : getDefaultValueForFieldType(fieldConfig[k].fieldType);
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
    return Object.assign((_a = {}, _a[MANUAL_DIRTY_TRIGGER_ID] = "", _a), defaultValues, definedInitialValues);
};
