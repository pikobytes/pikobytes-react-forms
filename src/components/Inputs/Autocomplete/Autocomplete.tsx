/**
 * Created by nicolas.looschen@pikobytes.de on 06.07.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useController, useFormContext } from 'react-hook-form';
import {
  IAutocompleteCustomProperties,
  IDefaultUiSettings,
  IGenericField,
} from '../../../typedefs/FieldConfiguration';
import {
  getHighlightBackgroundColor,
  shouldHighlightBackground,
  shouldShowRequiredLabel,
} from '../util';

export const Autocomplete = ({
  customProperties: { options = [], registerReturn, freeSolo, ...rest },
  fieldId,
  uiSettings: { disabled, description, label, placeholder, size, variant },
  validation,
}: IGenericField<IDefaultUiSettings, IAutocompleteCustomProperties>) => {
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

  const handleChange = (e: any, newValue: any, reason: string) => {
    if (typeof newValue === 'string') {
      // in free solo mode this will be a string
      onChange(newValue ?? '');
    } else {
      onChange(newValue?.value ?? '');
    }
  };

  const { formState } = useFormContext();

  const { errors } = formState;
  const error = errors[fieldId];

  const isErroneous = error !== undefined;
  const isRequired = required !== false;
  const showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);

  const highlightBackground = shouldHighlightBackground(
    value,
    isRequired,
    disabled
  );

  const handleInputChange = (event: any, value: string, reason: string) => {
    onChange(value);
  };

  return (
    <MUIAutocomplete
      {...rest}
      disabled={disabled}
      freeSolo={freeSolo}
      fullWidth
      id="combo-box-demo"
      options={options}
      onBlur={onBlur}
      onChange={handleChange}
      inputValue={freeSolo ? value : undefined}
      onInputChange={freeSolo ? handleInputChange : undefined}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            error={isErroneous}
            helperText={isErroneous ? error!.message : description}
            InputLabelProps={{ required: showRequiredLabel, shrink: true }}
            key={fieldId}
            label={label}
            name={fieldId}
            placeholder={placeholder}
            variant={variant}
          />
        );
      }}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue);
        const parts = parse(option.label, matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
      size={size}
      sx={(theme) => ({
        backgroundColor: getHighlightBackgroundColor(
          theme,
          highlightBackground
        ),
      })}
      value={options.find((option) => option.value === value) ?? null}
    />
  );
};

export default Autocomplete;
