/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';

import Checkbox from "./Checkbox";
import {FormProviderWrapper} from "../../Form/Form.stories";

export default {
    title: "Example/Checkbox",
    component: Checkbox,
}

function Template(args: any) {
    return <FormProviderWrapper defaultValues={args.defaultValues}><Checkbox {...args} /></FormProviderWrapper>
}


export const Default = Template.bind({});
// @ts-ignore
Default.args = {
    fieldId: "test",
    uiSettings: {
        label: "test",
    },
    validation: { required: false}
};



export const WithDefaultValue = Template.bind({});
// @ts-ignore
WithDefaultValue.args = {
    defaultValues: {test: true},
    fieldId: "test",
    uiSettings: {
        label: "test",
    },
    validation: { required: false}
};

