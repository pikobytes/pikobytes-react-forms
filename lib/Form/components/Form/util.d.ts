/**
 * Created by nicolas.looschen@pikobytes.de on 04.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { E_CONDITION_EFFECTS, IFieldCondition, IFieldConfig, IStringIndexableObject } from "../../typedefs/IField";
import FIELD_TYPES from "../../typedefs/FieldTypes";
export declare const cloneValues: (val: any) => any;
export declare const matchFieldCondition: (condition: IFieldCondition, fieldValue: string | number) => boolean;
export declare const applyConditions: (fieldValues: IStringIndexableObject<string | number>, conditions?: IStringIndexableObject<IFieldCondition> | undefined) => {
    type: E_CONDITION_EFFECTS;
    isMet: boolean;
} | {
    type: IFieldCondition;
    isMet: boolean;
};
export declare const getDefaultValueForFieldType: (fieldType: FIELD_TYPES) => false | "";
export declare const getDefaultValues: (initialValues: IStringIndexableObject<string | undefined> | undefined, fieldConfig: IFieldConfig) => {
    MANUAL_DIRTY_TRIGGER: string;
} & IStringIndexableObject<string | boolean> & IStringIndexableObject<string>;
