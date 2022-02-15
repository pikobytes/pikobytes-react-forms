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
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { E_CONDITION_EFFECTS, E_FIELD_CONDITION_TYPES, } from '../../../typedefs/ConditionalFields';
export var applyConditions = function (fieldValues, conditions) {
    if (conditions === undefined) {
        return { effect: E_CONDITION_EFFECTS.DISPLAY, isMet: true };
    }
    else {
        var effect = conditions.effect, rest = __rest(conditions, ["effect"]);
        return {
            effect: effect,
            isMet: Object.entries(rest)
                .map(function (_a) {
                var field = _a[0], condition = _a[1];
                return matchFieldCondition(condition, fieldValues[field]);
            })
                .every(function (c) { return c; }),
        };
    }
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
            throw new Error('Unknown Condition Type.');
    }
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
var matchValueCondition = function (condition, fieldValue) {
    var value = condition.value;
    return value === fieldValue;
};
var matchValuesCondition = function (condition, fieldValue) {
    var value = condition.value;
    return value.includes(fieldValue);
};
