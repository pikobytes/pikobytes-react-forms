/**
 * Created by nicolas.looschen@pikobytes.de on 5/3/21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Event } from '@mui/icons-material';
import { DatePicker as MUIDatePicker } from '@mui/lab';
import { useController, useFormContext } from 'react-hook-form';

import {
  IDefaultUiSettings,
  IGenericField,
} from '../../../typedefs/FieldConfiguration';
import {
  getHighlightBackgroundColor,
  shouldHighlightBackground,
  shouldShowRequiredLabel,
} from '../util';

export function DatePicker({
  fieldId,
  uiSettings: { disabled, description, label, placeholder, size, variant },
  validation,
}: IGenericField<IDefaultUiSettings, undefined>) {
  const { field } = useController({
    name: fieldId,
    rules: Object.assign({ disabled }, validation),
  });
  const { ref, value, onChange, ...rest } = field;

  const { formState } = useFormContext();

  const { required } = validation;
  const { errors } = formState;
  const error = errors[fieldId];

  const isErroneous = error !== undefined;
  const isRequired = required !== false;

  const highlightBackground = shouldHighlightBackground(
    value,
    isRequired,
    disabled
  );
  const showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);

  return (
    <MUIDatePicker
      clearable
      disabled={disabled}
      renderInput={(props) => (
        <TextField
          {...props}
          InputLabelProps={{ required: showRequiredLabel, shrink: true }}
          fullWidth
          helperText={isErroneous ? error.message : description}
          placeholder={placeholder}
          size={size}
          variant={variant}
        />
      )}
      disableFuture
      inputFormat="yyyy/MM/dd"
      mask="____/__/__"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <Event />
            </IconButton>
          </InputAdornment>
        ),
        sx: (theme) => ({
          backgroundColor: getHighlightBackgroundColor(
            theme,
            highlightBackground
          ),
        }),
      }}
      inputRef={ref}
      label={label}
      value={value === '' ? null : value}
      onChange={(dateTimeObject) => {
        if (dateTimeObject !== null && !isNaN(dateTimeObject.getTime())) {
          // publish string to form state instead of datetime object

          // @ts-ignore
          onChange(dateTimeObject.toISOString().split('T')[0]);
        }
      }}
      {...rest}
    />
  );
}

export default DatePicker;
