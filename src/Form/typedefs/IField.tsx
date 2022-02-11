/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { GridSize } from '@mui/material';

import FIELD_TYPES from './FieldTypes';
import { ERROR_MESSAGE_KEY } from './ErrorMessages';
import { E_VALIDATION_FUNCTION_REGISTRY } from '../configuration/ValidationFunctionConfiguration';
import { EFormats } from '../../typedefs/configuration';
import {ISuggestionUploadAutosuggest, PREVIEW_TYPE} from "./typedefs";
import {UseFormRegisterReturn} from "react-hook-form";

export interface IOption {
  description?: string;
  helperText?: string;
  label: string;
  value: string | number;
}

export type IStringIndexableObject<T> = { [k: string]: T }

export interface ISection {
  title?: string;
  fields: Array<string>;
}

type variant = 'filled' | 'outlined' | 'standard';
type size = 'small' | 'medium';

export interface IError {
  type: string;
  message: string;
}

export interface ITagValue {
  tags: Array<string>;
  tagsToDelete?: Array<string>;
}

export enum E_CONDITION_EFFECTS {
  DISPLAY = "display",
  ENABLE = "enable",
}

export enum E_FIELD_CONDITION_TYPES {
  RANGE = "range",
  PATTERN = "pattern",
  VALUE = "value",
  VALUES = "values"
}

export interface IFieldCondition {
  type:  E_FIELD_CONDITION_TYPES;
  value: any;
}

export interface IRangeCondition extends IFieldCondition{
  type: E_FIELD_CONDITION_TYPES.RANGE;
  value: [number, number];
}

export interface IPatternCondition extends IFieldCondition{
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

export type IFieldConfig = IStringIndexableObject<IGenericField<any, any>>;


// props every field expects
export interface IGenericField<UiSettings, CustomProperties> {
  condition?: {[key: string]: IFieldCondition };
  customProperties: CustomProperties;
  defaultValue?: string;
  loading?: boolean;
  fieldId: string;
  fieldType: FIELD_TYPES;
  uiSettings: UiSettings;
  validation: IValidation;
}

export interface IDefaultUiSettings {
  columns?: number;
  description?: string;
  disabled?: boolean;
  format: EFormats;
  label: string;
  placeholder?: string;
  size?: size;
  variant: variant;
}

export interface ITextField<T> extends IGenericField<T, ITextFieldCustomProperties>{}

export interface IOutsideRegisterAllowedProperties {
  registerReturn?: UseFormRegisterReturn;
}


export interface ITextFieldCustomProperties extends IOutsideRegisterAllowedProperties{
  accept?: string;
  multiple?: boolean;
  rows?: number;
  step?: number;
}

export interface ISelectCustomProperties extends IOutsideRegisterAllowedProperties {
  defaultValue: string;
  options: Array<IOption>
}

export interface ISpecialEditBehaviorProperties {
  isEdit?: boolean;
}

export interface ITagManagementUiSettings extends IDefaultUiSettings{
  addButtonTooltip?: string;
  component?: "input" | "autosuggest";
  options?: Array<IOption | string>;
}

export interface ITagManagement<T> extends IGenericField<T, ISpecialEditBehaviorProperties>{}

export interface IField {
  accept?: string;
  columns?: GridSize;
  defaultValue?: string;
  defaultSuggestions?: Array<ISuggestionUploadAutosuggest>;
  format?: EFormats;
  helperText?: string;
  label?: string;
  isEdit?: boolean;
  placeholder?: string;
  previewType?: PREVIEW_TYPE;
  maxNumberSuggests?: number;
  multiple?: boolean;
  tooltip?: string;
  type: FIELD_TYPES;
  key: string;
  options?: Array<IOption>;
  required?: boolean;
  rows?: number;
  sessionId?: string;
  size?: 'small' | 'medium';
  step?: number;
  validation: IValidation;
}

export interface IValidation {
  required: boolean | ERROR_MESSAGE_KEY;
  maxLength?: { value: number; message: ERROR_MESSAGE_KEY };
  minLength?: { value: number; message: ERROR_MESSAGE_KEY };
  max?: { value: number; message: ERROR_MESSAGE_KEY };
  min?: { value: number; message: ERROR_MESSAGE_KEY };
  pattern?: { value: RegExp; message: ERROR_MESSAGE_KEY };
  customValidationFunctions?: {
    [name: string]: E_VALIDATION_FUNCTION_REGISTRY;
  };
}
