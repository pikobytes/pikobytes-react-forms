/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';

import Form from "./Form";
import FIELD_TYPES from "../../typedefs/FieldTypes";
import Field from "../Field/Field";

export default {
    title: "Example/Form",
    component: Form,
}

function Template(args: any) {
    return <Form {...args} />
}


export const Default = Template.bind({});
// @ts-ignore
Default.args = {
    FieldComponent: Field,
    initialValues: {},
    loadingFields: [],
    sections: [{title: "General", fields: [{ key: "test", type: FIELD_TYPES.TEXTFIELD, validation: {} }]}]
};
