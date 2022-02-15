/// <reference types="react" />
import { FieldError } from 'react-hook-form';
import { TStringIndexableObject, TCustomMapping, TVariant, TValidationFunctionLookup } from '../../typedefs/typedefs';
export interface IFormProps {
    activatePersistence?: boolean;
    configuration: Object;
    customMapping?: TCustomMapping;
    fieldsToWatch?: Array<string>;
    formId: string;
    initialValues?: {
        [key: string]: string;
    };
    loadingFields?: Array<string>;
    onError: (errors: TStringIndexableObject<FieldError>, values: TStringIndexableObject<string>) => void;
    onPublishValues?: (fieldValues: Array<string>, previousFieldValues: Array<string>, options: {
        setValue: (field: string, newValue: string) => void;
    }) => void;
    onSetIsDirty?: (isDirty: boolean) => void;
    onSubmit: (data: any) => void;
    onUpdateResetForm?: (e: any) => void;
    persistenceKey?: string;
    uiConfiguration: Object;
    variant?: TVariant;
    validationFunctions?: TValidationFunctionLookup;
}
export declare const MANUAL_DIRTY_TRIGGER_ID = "MANUAL_DIRTY_TRIGGER";
export declare function Form(props: IFormProps): JSX.Element;
export default Form;
