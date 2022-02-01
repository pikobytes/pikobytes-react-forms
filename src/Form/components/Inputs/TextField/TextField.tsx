/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, { useRef } from 'react';
import {
  alpha,
  CircularProgress,
  InputAdornment,
  makeStyles,
  TextField as MUITextField,
  Theme,
} from '@mui/material';
import { FieldProps } from '../../Field/Field';
import FIELD_TYPES from '../../../typedefs/FieldTypes';
import { UseFormRegisterReturn } from 'react-hook-form';

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

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: ({ highlightBackground }: { highlightBackground: boolean }) => ({
//       backgroundColor: highlightBackground
//         ? alpha(theme.palette.error.light, 0.35)
//         : theme.palette.common.white,
//     }),
//   })
// );

export default function TextField(
  props: FieldProps & { endAdornments?: Array<React.ComponentType> }
) {
  const {
    endAdornments = [],
    error,
    field: {
      accept,
      helperText,
      key,
      label,
      multiple,
      placeholder,
      rows,
      step,
      size,
      type,
      validation: { required },
    },
    loading,
    register,
    registerReturn,
    variant,
  } = props;

  if (register === undefined && registerReturn === undefined) {
    throw new Error('Either register or registerReturn must be supplied');
  }
  const { ref, ...rest } =
    register !== undefined
      ? register(key)
      : (registerReturn as UseFormRegisterReturn);

  const isErroneous = error !== undefined;
  const fieldRef = useRef<HTMLInputElement | null>(null);

  return (
    <React.Fragment>
      <MUITextField
        // className={classes.root}
        error={isErroneous}
        helperText={isErroneous ? error!.message : helperText}
        inputRef={(e) => {
          ref(e);
          fieldRef.current = e;
        }}
        label={label}
        multiline={type === FIELD_TYPES.TEXTFIELD}
        inputProps={{
          accept,
          multiple,
          step,
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
        name={key}
        placeholder={placeholder === undefined ? label : placeholder}
        fullWidth
        required={required !== false}
        size={size}
        InputLabelProps={{ shrink: true }}
        type={getHTMLType(type)}
        variant={variant}
      />
    </React.Fragment>
  );
}
