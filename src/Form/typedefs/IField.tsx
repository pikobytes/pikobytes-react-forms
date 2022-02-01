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

export interface IOption {
  description?: string;
  helperText?: string;
  label: string;
  value: string | number;
}

export interface ISection {
  title: string;
  fields: Array<IField>;
}

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
