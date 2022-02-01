/**
 * Created by nicolas.looschen@pikobytes.de on 5/3/21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import {
    alpha,
    createStyles,
    IconButton,
    InputAdornment,
     TextField,
    Theme,
} from '@mui/material';
import { Event } from '@mui/icons-material';
import { DateTimePicker as MUIDateTimePicker } from '@mui/lab';
import { ControllerRenderProps } from 'react-hook-form';

import { IField } from '../../../typedefs/IField';

export interface DateTimePickerProps {
  error?: {
    type: string;
    message: string;
  };
  field: IField;
  formField: ControllerRenderProps;
  variant?: 'filled' | 'outlined' | 'standard';
}

export function DateTimePicker(props: DateTimePickerProps) {
  const { error, field, formField, variant } = props;
  const { ref, value, onChange, ...rest } = formField;
  const { key, label, placeholder, required = false, size, tooltip } = field;

  return (
    <MUIDateTimePicker
        renderInput={(props) => <TextField {...props} />}
      ampm={false}
      disableFuture
      key={key}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <Event />
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputRef={ref}
      label={label}
      value={value === '' ? null : value}
      onChange={(dateTimeObject) => {
        if (dateTimeObject !== null) {
          // publish string to form state instead of datetime object

          // @ts-ignore
            onChange(dateTimeObject.toISO());
        }
      }}
      {...rest}
    />
  );
}

export default DateTimePicker;
