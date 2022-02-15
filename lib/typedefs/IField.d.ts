import { ERROR_MESSAGE_KEY } from './ErrorMessages';
import { E_VALIDATION_FUNCTION_REGISTRY } from '../configuration/ValidationFunctionConfiguration';
export interface IOption {
    description?: string;
    helperText?: string;
    label: string;
    value: string | number;
}
export declare type IStringIndexableObject<T> = {
    [k: string]: T;
};
export interface ISection {
    title?: string;
    fields: Array<string>;
}
export interface IError {
    type: string;
    message: string;
}
export interface ITagValue {
    tags: Array<string>;
    tagsToDelete?: Array<string>;
}
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
export interface IValidation {
    required: boolean | ERROR_MESSAGE_KEY;
    maxLength?: {
        value: number;
        message: ERROR_MESSAGE_KEY;
    };
    minLength?: {
        value: number;
        message: ERROR_MESSAGE_KEY;
    };
    max?: {
        value: number;
        message: ERROR_MESSAGE_KEY;
    };
    min?: {
        value: number;
        message: ERROR_MESSAGE_KEY;
    };
    pattern?: {
        value: RegExp;
        message: ERROR_MESSAGE_KEY;
    };
    customValidationFunctions?: {
        [name: string]: E_VALIDATION_FUNCTION_REGISTRY;
    };
}
