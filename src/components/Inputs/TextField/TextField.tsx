/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, { useRef } from 'react';
import {
  CircularProgress,
  InputAdornment,
  TextField as MUITextField,
} from '@mui/material';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';

import FIELD_TYPES from '../../../typedefs/FieldTypes';
import {
  IDefaultUiSettings,
  ITextField,
} from '../../../typedefs/FieldConfiguration';
import {
  getHighlightBackgroundColor,
  shouldHighlightBackground,
  shouldShowRequiredLabel,
} from '../util';

function getHTMLType(fieldType: FIELD_TYPES): string {
  switch (fieldType) {
    case FIELD_TYPES.NUMBER:
      return 'number';
    case FIELD_TYPES.STRING:
      return 'text';
    case FIELD_TYPES.FILE:
      return 'file';
    default:
      return fieldType;
  }
}

export default function TextField(
  props: ITextField<IDefaultUiSettings> & {
    endAdornments?: Array<React.ComponentType>;
  }
) {
  const {
    customProperties,
    fieldId,
    endAdornments = [],
    fieldType,
    loading,
    uiSettings: { disabled, description, label, placeholder, size, variant },
    validation,
  } = props;

  const { register } = useFormContext();

  // ref
  const fieldRef = useRef<HTMLInputElement | null>(null);

  const { registerReturn, rows, ...otherCustomProperties } =
    customProperties ?? {};
  const { required } = validation ?? {};

  if (register === undefined && registerReturn === undefined) {
    throw new Error('Either register or registerReturn must be supplied');
  }

  const { formState } = useFormContext();
  const { errors } = formState;
  const error = errors[fieldId];

  const { ref, ...rest } =
    register !== undefined
      ? register(
          fieldId,
          Object.assign({ disabled, shouldUnregister: true }, validation)
        )
      : (registerReturn as UseFormRegisterReturn);

  const isErroneous = error !== undefined;
  const isRequired = required !== false;

  const highlightBackground =
    fieldRef !== null &&
    fieldRef.current !== null &&
    shouldHighlightBackground(fieldRef.current.value, isRequired, disabled);

  const showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);

  return (
    <React.Fragment>
      <MUITextField
        disabled={disabled}
        error={isErroneous}
        helperText={isErroneous ? error!.message : description}
        inputRef={(e) => {
          ref(e);
          fieldRef.current = e;
        }}
        label={label}
        key={fieldId}
        multiline={fieldType === FIELD_TYPES.TEXTFIELD}
        inputProps={{
          ...otherCustomProperties,
          ...rest,
        }}
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {loading && (
                <InputAdornment position="start">
                  <CircularProgress variant="indeterminate" />
                </InputAdornment>
              )}
              {endAdornments.map((EndAdornment, index) => (
                <InputAdornment key={index} position="start">
                  <EndAdornment />
                </InputAdornment>
              ))}
            </React.Fragment>
          ),
        }}
        rows={rows}
        name={fieldId}
        placeholder={placeholder === undefined ? label : placeholder}
        fullWidth
        size={size}
        InputLabelProps={{ required: showRequiredLabel, shrink: true }}
        type={getHTMLType(fieldType)}
        variant={variant}
        sx={(theme) => ({
          backgroundColor: getHighlightBackgroundColor(
            theme,
            highlightBackground
          ),
        })}
      />
    </React.Fragment>
  );
}
