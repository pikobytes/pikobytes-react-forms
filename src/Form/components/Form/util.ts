/**
 * Created by nicolas.looschen@pikobytes.de on 04.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import {IFieldConfig, IStringIndexableObject} from "../../typedefs/IField";
import {MANUAL_DIRTY_TRIGGER_ID} from "./Form";
import FIELD_TYPES from "../../typedefs/FieldTypes";

export const cloneValues = (val: any) =>
    typeof val === 'object' && val !== null ? Object.assign({}, val) : val;


export const getDefaultValueForFieldType = (fieldType: FIELD_TYPES) => {
    switch (fieldType) {

        case FIELD_TYPES.BOOLEAN:
        case FIELD_TYPES.BOOL:
            return false;
        default:
            return ""
    }
}

export const getDefaultValues = (initialValues: IStringIndexableObject<string | undefined> | undefined, fieldConfig: IFieldConfig) => {
    // create empty default values for all fields without default values in the config
    const fieldKeys = Object.keys(fieldConfig);
    const defaultValues: IStringIndexableObject<string | boolean> = {};
    fieldKeys.forEach(k => {
        defaultValues[k] = fieldConfig[k].defaultValue ?? getDefaultValueForFieldType(fieldConfig[k].fieldType);
    });

    const definedInitialValues: IStringIndexableObject<string> = {};
    if (initialValues !== undefined) {
        Object.entries(initialValues).forEach(([k, v]) => {
            if (v !== undefined && v !== null) {
                definedInitialValues[k] = v;
            }
        })
    }

    // add default value for dirty trigger field, overwrite empty entries with initialValues
    return Object.assign({[MANUAL_DIRTY_TRIGGER_ID]: ""}, defaultValues, definedInitialValues);
}
