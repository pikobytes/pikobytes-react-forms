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
} from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import {
  IDefaultUiSettings,
  IGenericField,
} from '../../../typedefs/FieldConfiguration';
import { getHighlightBackgroundColor } from '../util';

export default function Checkbox(
  props: IGenericField<IDefaultUiSettings, void>
) {
  const {
    fieldId,
    uiSettings: { disabled, label, size },
    validation,
  } = props;

  const { required } = validation;
  const { formState } = useFormContext();
  const { field } = useController({
    name: fieldId,
    rules: Object.assign({ disabled }, validation),
  });

  const { errors } = formState;
  const error = errors[fieldId];
  const isErroneous = error !== undefined;
  const isRequired = required !== false;
  const highlightBackground = field.value !== true && isRequired;

  return (
    <FormControl
      disabled={disabled}
      error={isErroneous}
      fullWidth
      required={isRequired}
      size={size}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <MUICheckBox
              {...field}
              checked={field.value ?? false}
              onChange={(e) => {
                field.onChange(e.target.checked);
              }}
            />
          }
          label={label ?? ''}
          sx={(theme) => ({
            backgroundColor: getHighlightBackgroundColor(
              theme,
              highlightBackground
            ),
          })}
        />
      </FormGroup>
      {isErroneous && <FormHelperText>{error!.message}</FormHelperText>}
    </FormControl>
  );
}
