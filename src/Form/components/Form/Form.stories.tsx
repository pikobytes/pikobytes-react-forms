/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';

import Form from "./Form";
import FIELD_TYPES from "../../typedefs/FieldTypes";
import {FormProvider, useForm} from 'react-hook-form';
import {default as exampleConfiguration} from "./exampleConfiguration.json";
import {default as exampleUiConfiguration} from "./exampleUiConfiguration.json";

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
    return <><Form {...args} /><button form="test" type="submit">Submit</button></>
}


export const Default = Template.bind({});
// @ts-ignore
Default.args = {
    formId: "test",
    onError: (e) => {console.log(e)},
    configuration: exampleConfiguration,
    uiConfiguration: exampleUiConfiguration,
};


export const MultipleFields = Template.bind({});
// @ts-ignore
MultipleFields.args = {
    initialValues: {test_2: "1"},
    loadingFields: [],
    onSetIsDirty: (e: any) => {
        console.log(e)
    },
    formId: "test",
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
    initialValues: {test_2: true},
    loadingFields: [],
    onSetIsDirty: (e: any) => {
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

