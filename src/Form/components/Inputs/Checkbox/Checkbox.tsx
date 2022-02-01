/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import {
  Checkbox as MUICheckBox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';

import { FieldProps } from '../../Field/Field';

export default function Checkbox(props: FieldProps) {
  const {
    defaultValue,
    error,
    field: {
      key,
      label,
      size,
      validation: { required },
    },
    register,
  } = props;

  if (register === undefined) {
    throw new Error('register must not bet undefined');
  }

  const { ref, ...rest } = register(key);
  const isErroneous = error !== undefined;

  return (
    <FormControl
      error={isErroneous}
      fullWidth
      required={required !== false}
      size={size}
    >
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <MUICheckBox
              defaultValue={defaultValue}
              inputRef={ref}
              inputProps={{ ...rest }}
            />
          }
          label={''}
        />
      </FormGroup>
      {isErroneous && <FormHelperText>{error!.message}</FormHelperText>}
    </FormControl>
  );
}
