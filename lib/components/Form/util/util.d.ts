import FIELD_TYPES from '../../../typedefs/FieldTypes';
import { IFieldConfig } from '../../../typedefs/FieldConfiguration';
import { TStringIndexableObject, TValidationFunctionLookup } from '../../../typedefs/typedefs';
export declare const cloneValues: (val: any) => any;
export declare const getDefaultValues: (initialValues: TStringIndexableObject<string | undefined> | undefined, fieldConfig: IFieldConfig) => {
    MANUAL_DIRTY_TRIGGER: string;
} & TStringIndexableObject<string | boolean> & TStringIndexableObject<string>;
export declare const getDefaultValueForFieldType: (fieldType: FIELD_TYPES) => false | "";
export declare const getDependentOnFields: (fieldConfigs: IFieldConfig) => string[];
export declare const resolveValidationFunctions: (validationFunctionLookup?: TValidationFunctionLookup | undefined, validationFunctions?: string[] | undefined) => {
    validate: TValidationFunctionLookup;
} | {
    validate?: undefined;
};
