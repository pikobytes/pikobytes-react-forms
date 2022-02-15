import FIELD_TYPES from '../../typedefs/FieldTypes';
import { IFieldConfig, IGenericField } from '../../typedefs/FieldConfiguration';
import { TFieldValue, TStringIndexableObject } from '../../typedefs/typedefs';
import { E_CONDITION_EFFECTS, IFieldCondition } from '../../typedefs/ConditionalFields';
export declare const cloneValues: (val: any) => any;
export declare const matchFieldCondition: (condition: IFieldCondition, fieldValue: TFieldValue) => boolean;
export declare const applyConditions: (fieldValues: TStringIndexableObject<string | number>, conditions?: TStringIndexableObject<IFieldCondition> | undefined) => {
    effect: E_CONDITION_EFFECTS;
    isMet: boolean;
};
export declare const getDependentOnFields: (fieldConfigs: TStringIndexableObject<IGenericField<any, any>>) => string[];
export declare const getDefaultValueForFieldType: (fieldType: FIELD_TYPES) => false | "";
export declare const getDefaultValues: (initialValues: TStringIndexableObject<string | undefined> | undefined, fieldConfig: IFieldConfig) => {
    MANUAL_DIRTY_TRIGGER: string;
} & TStringIndexableObject<string | boolean> & TStringIndexableObject<string>;
