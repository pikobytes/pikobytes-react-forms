/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from "react";
import { FieldError } from "react-hook-form";
import { IDefaultUiSettings, IGenericField, IStringIndexableObject } from "../../typedefs/IField";
export interface IFormProps {
    activatePersistence?: boolean;
    configuration: Object;
    uiConfiguration: Object;
    customMapping?: {
        [key: string]: React.ComponentType<IGenericField<IDefaultUiSettings, any>>;
    };
    fieldsToWatch?: Array<string>;
    formId: string;
    initialValues?: {
        [key: string]: string;
    };
    loadingFields?: Array<string>;
    onError: (errors: IStringIndexableObject<FieldError>, values: IStringIndexableObject<string>) => void;
    onPublishValues?: (fieldValues: Array<string>, previousFieldValues: Array<string>, options: {
        setValue: (field: string, newValue: string) => void;
    }) => void;
    onSetIsDirty?: (isDirty: boolean) => void;
    onSubmit: (data: any) => void;
    onUpdateResetForm?: (e: any) => void;
    persistenceKey?: string;
    variant?: "filled" | "outlined" | "standard";
}
export declare const MANUAL_DIRTY_TRIGGER_ID = "MANUAL_DIRTY_TRIGGER";
export declare function Form(props: IFormProps): JSX.Element;
export default Form;
