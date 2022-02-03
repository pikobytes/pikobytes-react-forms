/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, {useRef} from 'react';
import {
    alpha,
    FormControl,
    FormHelperText,
    InputLabel,
    Select as MUISelect,
} from '@mui/material';

import {useFormContext, UseFormRegisterReturn} from "react-hook-form";
import {
    IDefaultUiSettings,
    IGenericField,
    ISelectCustomProperties
} from "../../../typedefs/IField";

export default function Select({
                                   customProperties: {
                                       options,
                                       registerReturn
                                   },
                                   fieldId,
                                   uiSettings: {
                                       label,
                                       placeholder,
                                       size,
                                       variant
                                   },
                                   validation

                               }: IGenericField<IDefaultUiSettings, ISelectCustomProperties>) {

    const {register} = useFormContext();

    if (register === undefined && registerReturn === undefined) {
        throw new Error('Either register or registerReturn must be supplied');
    }

    const {required} = validation;

    const {ref, ...rest} =
        register !== undefined
            ? register(fieldId)
            : (registerReturn as UseFormRegisterReturn);

    const {formState} = useFormContext();

    const {errors} = formState;
    const error = errors[fieldId];

    const isErroneous = error !== undefined;
    const fieldRef = useRef<HTMLInputElement | null>(null);

    const highlightBackground =
        required &&
        fieldRef !== null &&
        fieldRef.current !== null &&
        fieldRef!.current.value === '';

    return (
        <FormControl
            key={fieldId}
            error={isErroneous}
            fullWidth
            required={required !== false}
            size={size}
            variant={variant}
        >
            <InputLabel htmlFor={label} shrink >
                {label}
            </InputLabel>
            <MUISelect
                inputProps={{id: label, ...rest}}
                inputRef={(e) => {
                    ref(e);
                    fieldRef.current = e;
                }}
                label={label}
                native
                sx={(theme) => ({
                    backgroundColor: highlightBackground
                        ? alpha(theme.palette.error.light, 0.35)
                        : theme.palette.background.default
                })}
            >
                <option value="">{placeholder}</option>

                {options?.map(({label, value, helperText}) => (
                    <option key={label} title={helperText} value={value}>
                        {label}
                    </option>
                ))}
            </MUISelect>
            {isErroneous && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
    );
}
