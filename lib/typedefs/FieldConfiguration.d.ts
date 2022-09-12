/**
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import FIELD_TYPES from './FieldTypes';
import { EFormats } from './configuration';
import { TSize, TStringIndexableObject, TValidationFunctionLookup, TVariant } from './typedefs';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ERROR_MESSAGE_KEY } from './ErrorMessages';
import { IFieldCondition } from './ConditionalFields';
import { AutocompleteProps } from '@mui/material';
export declare type IFieldConfig = TStringIndexableObject<IParsedGenericField<any, any>>;
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
    validate?: TValidationFunctionLookup;
}
interface IParsedValidation extends Omit<IValidation, 'validate'> {
    validationFunctions?: Array<string>;
}
export interface IGenericField<UiSettings, CustomProperties> {
    condition?: {
        [key: string]: IFieldCondition;
    };
    customProperties: CustomProperties;
    defaultValue?: string;
    fieldId: string;
    fieldType: FIELD_TYPES;
    loading?: boolean;
    uiSettings: UiSettings;
    validation: IValidation;
}
export interface IParsedGenericField<T, U> extends Omit<IGenericField<T, U>, 'validation'> {
    validation: IParsedValidation;
}
export interface IDefaultUiSettings {
    columns?: number;
    description?: string;
    disabled?: boolean;
    format: EFormats;
    label: string;
    placeholder?: string;
    size?: TSize;
    variant: TVariant;
}
export interface IOutsideRegisterAllowedProperties {
    registerReturn?: UseFormRegisterReturn;
}
export interface IDatePicker<T> extends IGenericField<T, IDatePickerCustomProperties> {
}
export interface IDatePickerCustomProperties {
    disableFuture?: boolean;
}
export interface ITextField<T> extends IGenericField<T, ITextFieldCustomProperties> {
}
export interface ITextFieldCustomProperties extends IOutsideRegisterAllowedProperties {
    accept?: string;
    multiple?: boolean;
    rows?: number;
    step?: number;
}
export interface ISelectCustomProperties extends IOutsideRegisterAllowedProperties {
    defaultValue: string;
    options: Array<IOption>;
}
export interface IAutocompleteCustomProperties extends Omit<AutocompleteProps<IOption, boolean | undefined, boolean | undefined, boolean | undefined>, 'renderInput'>, IOutsideRegisterAllowedProperties {
}
export interface ITagManagement<T> extends IGenericField<T, ISpecialEditBehaviorProperties> {
}
export interface ISpecialEditBehaviorProperties {
    isEdit?: boolean;
}
export interface ITagManagementUiSettings extends IDefaultUiSettings {
    addButtonTooltip?: string;
    component?: 'input' | 'autosuggest';
    options?: Array<IOption | string>;
}
export interface IOption {
    description?: string;
    helperText?: string;
    label: string;
    value: string | number;
}
export {};
