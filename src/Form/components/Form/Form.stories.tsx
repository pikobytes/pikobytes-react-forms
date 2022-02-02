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
import {FormProvider, useForm} from 'react-hook-form';

export default {
    title: "Example/Form",
    component: Form,
}

export function FormProviderWrapper({
                                        children,
                                        defaultValues
                                    }: { children: JSX.Element, defaultValues: { [key: string]: string } }) {
    const methods = useForm({defaultValues});

    return <FormProvider {...methods}>
        {children}
    </FormProvider>
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
    sections: [{title: "General", fields: [{key: "test", type: FIELD_TYPES.TEXTFIELD, validation: {}}]}]
};


export const MultipleFields = Template.bind({});
// @ts-ignore
MultipleFields.args = {
    FieldComponent: Field,
    initialValues: {test_2: "1"},
    loadingFields: [],
    onSetIsDirty: (e) => {
        console.log(e)
    },
    sections: [{
        title: "General",
        fields: [{key: "test", type: FIELD_TYPES.TEXTFIELD, validation: {}}, {
            label: "test",
            key: "test_2",
            type: FIELD_TYPES.SELECT,
            options: [{label: "test 1", value: 1}, {label: "test 2", value: 2}],
            validation: {}
        }]
    }]
};

export const CheckboxFields = Template.bind({});
// @ts-ignore
CheckboxFields.args = {
    FieldComponent: Field,
    initialValues: {test_2: true},
    loadingFields: [],
    onSetIsDirty: (e) => {
        console.log(e)
    },
    sections: [{
        title: "General",
        fields: [{key: "test", type: FIELD_TYPES.BOOL, validation: {}}, {
            label: "test",
            key: "test_2",
            type: FIELD_TYPES.BOOL,
            validation: {}
        }]
    }]
};

