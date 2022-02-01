/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, { useRef } from 'react';
import useResizeObserver from 'use-resize-observer';

import {
  alpha,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Select as MUISelect,
  Theme,
} from '@mui/material';
import { FieldProps } from '../../Field/Field';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: ({ highlightBackground }: { highlightBackground: boolean }) => ({
//       backgroundColor: highlightBackground
//         ? alpha(theme.palette.error.light, 0.35)
//         : theme.palette.common.white,
//     }),
//   })
// );

export default function Select(props: FieldProps) {
  const { error, field, formField, variant } = props;
  const { key, label, options, placeholder, required = false, size } = field;
  const labelRef = useRef<HTMLLabelElement>(null);
  const { width: labelWidth } = useResizeObserver({ ref: labelRef });

  const { onChange, value } = formField ?? {
    onChange: () => {},
    value: '',
  };

  const isErroneous = error !== undefined;

  return (
    <FormControl
      key={key}
      error={isErroneous}
      fullWidth
      required={required}
      size={size}
      variant={variant}
    >
      <InputLabel htmlFor={label} ref={labelRef} shrink variant={variant}>
        {label}
      </InputLabel>
      <MUISelect
        input={
          <OutlinedInput
            // className={classes.root}
            notched
            name={field.key}
            id={label}
          />
        }
        native
        onChange={(e) => {
          if (onChange !== undefined) {
            onChange(e.target.value);
          } else {
            throw new Error(
              'An onChange handler is required for the Select Element'
            );
          }
        }}
        value={value}
      >
        <option value="">{placeholder}</option>

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
