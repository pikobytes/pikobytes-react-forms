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
import {useController, useFormContext} from "react-hook-form";

import {IDefaultUiSettings, IGenericField} from "../../../typedefs/IField";

export default function Checkbox(props: IGenericField<IDefaultUiSettings, void>) {
    const {
        fieldId,
        uiSettings: {
            label,
            size
        },
        validation: {
            required
        }

    } = props;

    const {formState} = useFormContext();
    const {field} = useController({name: fieldId});

    const {errors} = formState;
    const error = errors[fieldId];
    const isErroneous = error !== undefined;

    return (
        <FormControl
            error={isErroneous}
            fullWidth
            required={required !== false}
            size={size}
        >
            <FormGroup>
                <FormControlLabel
                    control={
                        <MUICheckBox {...field} checked={field.value ?? false} onChange={e => {
                            field.onChange(e.target.checked)
                        }}/>
                    }
                    label={label ?? ""}
                />
            </FormGroup>
            {isErroneous && <FormHelperText>{error!.message}</FormHelperText>}
        </FormControl>
    );
}
