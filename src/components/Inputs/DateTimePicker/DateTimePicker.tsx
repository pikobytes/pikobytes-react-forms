/**
 * Created by nicolas.looschen@pikobytes.de on 5/3/21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { TextField } from '@mui/material';
import { DateTimePicker as MUIDateTimePicker } from '@mui/x-date-pickers';
import { useController, useFormContext } from 'react-hook-form';

import {
  IDatePicker,
  IDefaultUiSettings,
} from '../../../typedefs/FieldConfiguration';
import {
  getHighlightBackgroundColor,
  shouldHighlightBackground,
  shouldShowRequiredLabel,
} from '../util';

export function DateTimePicker({
  customProperties,
  fieldId,
  uiSettings: { disabled, description, label, placeholder, size, variant },
  validation,
}: IDatePicker<IDefaultUiSettings>) {
  const { field } = useController({
    name: fieldId,
    rules: Object.assign({ disabled }, validation),
  });
  const { ref, value, onChange, ...rest } = field;
  const { formState } = useFormContext();
  const { required } = validation;
  const { errors } = formState;

  const { disableFuture } = customProperties ?? { disableFuture: false };

  // derived state
  const error = errors[fieldId];

  const isErroneous = error !== undefined;
  const isRequired = required !== false;

  const highlightBackground = shouldHighlightBackground(
    value,
    isRequired,
    disabled
  );
  const showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);

  const handleChange = (dateTimeObject: any) => {
    if (dateTimeObject !== null && !isNaN(dateTimeObject.getTime())) {
      onChange(dateTimeObject.toISOString());
    } else {
      onChange('');
    }
  };

  return (
    <MUIDateTimePicker
      ampm={false}
      clearable
      disabled={disabled}
      disableFuture={disableFuture}
      renderInput={(props) => (
        <TextField
          {...props}
          InputLabelProps={{ required: showRequiredLabel, shrink: true }}
          fullWidth
          error={isErroneous}
          helperText={isErroneous ? error.message : description}
          placeholder={placeholder}
          size={size}
          variant={variant}
        />
      )}
      inputFormat="yyyy/MM/dd, HH:mm"
      mask="____/__/__, __:__"
      InputProps={{
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
      onChange={handleChange}
      {...rest}
    />
  );
}

export default DateTimePicker;
