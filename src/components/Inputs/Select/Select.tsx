/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import {
  alpha,
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  SelectChangeEvent,
} from '@mui/material';

import { useController, useFormContext } from 'react-hook-form';
import {
  IDefaultUiSettings,
  IGenericField,
  ISelectCustomProperties,
} from '../../../typedefs/FieldConfiguration';

const EMPTY_VALUE = 'none';

export default function Select({
  customProperties: { options, registerReturn },
  fieldId,
  uiSettings: { disabled, label, placeholder, size, variant },
  validation,
}: IGenericField<IDefaultUiSettings, ISelectCustomProperties>) {
  const { register } = useFormContext();

  if (register === undefined && registerReturn === undefined) {
    throw new Error('Either register or registerReturn must be supplied');
  }

  const { required } = validation;
  const { field } = useController({
    name: fieldId,
    rules: Object.assign({ disabled }, validation),
  });
  const { onChange, onBlur, ref, value } = field;

  const { formState } = useFormContext();

  const { errors } = formState;
  const error = errors[fieldId];

  const isErroneous = error !== undefined;
  const highlightBackground = required && value === '' && !disabled;

  const handleChange = (e: SelectChangeEvent) => {
    if (e.target.value === EMPTY_VALUE) {
      onChange('');
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <FormControl
      disabled={disabled}
      key={fieldId}
      error={isErroneous}
      fullWidth
      required={required !== false}
      size={size}
      variant={variant}
    >
      <InputLabel htmlFor={label} shrink>
        {label}
      </InputLabel>
      <MUISelect
        onBlur={onBlur}
        onChange={handleChange}
        inputRef={ref}
        label={label}
        native
        value={value === '' ? EMPTY_VALUE : value}
        sx={(theme) => ({
          backgroundColor: highlightBackground
            ? alpha(theme.palette.error.light, 0.35)
            : theme.palette.background.default,
        })}
      >
        <option value={EMPTY_VALUE} disabled={value !== EMPTY_VALUE}>
          {placeholder}
        </option>

        {options?.map(({ label, value, helperText }) => (
          <option key={label} title={helperText} value={value}>
            {label}
          </option>
        ))}
      </MUISelect>
      {isErroneous && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
}
