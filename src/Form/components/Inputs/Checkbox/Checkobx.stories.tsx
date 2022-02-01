/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';

import Checkbox from "./Checkbox";

export default {
    title: "Example/Checkbox",
    component: Checkbox,
}

function Template(args: any) {
    return <Checkbox {...args} />
}


export const Default = Template.bind({});
// @ts-ignore
Default.args = {
    field: {
        key: "test",
        validation: { required: false}
    },
    register: () => { return { ref: React.createRef()}},
};
