/**
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
export declare enum E_CONDITION_EFFECTS {
    DISPLAY = "display",
    ENABLE = "enable"
}
export declare enum E_FIELD_CONDITION_TYPES {
    RANGE = "range",
    PATTERN = "pattern",
    VALUE = "value",
    VALUES = "values"
}
export interface IFieldCondition {
    type: E_FIELD_CONDITION_TYPES;
    value: any;
}
export interface IRangeCondition extends IFieldCondition {
    type: E_FIELD_CONDITION_TYPES.RANGE;
    value: [number, number];
}
export interface IPatternCondition extends IFieldCondition {
    type: E_FIELD_CONDITION_TYPES.PATTERN;
    value: string;
}
export interface IValueCondition extends IFieldCondition {
    type: E_FIELD_CONDITION_TYPES.VALUE;
    value: string | number;
}
export interface IValuesCondition extends IFieldCondition {
    type: E_FIELD_CONDITION_TYPES.VALUES;
    value: Array<any>;
}
