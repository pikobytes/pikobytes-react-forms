/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';

import TextField from "./TextField";
import {FormProviderWrapper} from "../../Form/Form.stories";

export default {
    title: "Example/TextField",
    component: TextField,
}

function Template(args: any) {
    return <FormProviderWrapper>
        <TextField {...args} />
    </FormProviderWrapper>
}


export const Default = Template.bind({});
// @ts-ignore
Default.args = {
    field: {
        key: "test",
        validation: { required: false}
    },
    register: () => { return { ref: () => {}}},
};
