/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import {  LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, {useState} from 'react';

import DateTimePicker from "./DateTimePicker";

export default {
    title: "Example/DateTimePicker",
    component: DateTimePicker,
}

const Template = (args: any) => {
    const [value, setValue] = useState<string | null>("");

    const handleChange = (newValue: string) => {setValue(newValue)};

    return (<LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker {...args} formField={Object.assign(args.formField, {value: value, onChange: handleChange})} />
    </LocalizationProvider>)
};

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
    formField: { ref: () => {}},
    field: { key: "test"}
};


export const RequiredAndEmpty = Template.bind({});
// @ts-ignore
RequiredAndEmpty.args = {
    formField: { ref: () => {}, value: ""},
    field: { key: "a", required: true },
    variant: "outlined"
};