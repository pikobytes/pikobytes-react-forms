/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';

import Form from './Form';
import FIELD_TYPES from '../../typedefs/FieldTypes';
import { FormProvider, useForm } from 'react-hook-form';
import { default as exampleConfiguration } from './exampleConfiguration.json';
import { default as exampleUiConfiguration } from './exampleUiConfiguration.json';

export default {
  title: 'Example/Form',
  component: Form,
};

export function FormProviderWrapper({
  children,
  defaultValues,
}: {
  children: JSX.Element;
  defaultValues?: { [key: string]: string };
}) {
  const methods = useForm({ defaultValues });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

function Template(args: any) {
  return (
    <>
      <Form {...args} />
      <button form="test" type="submit">
        Submit
      </button>
    </>
  );
}

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
  formId: 'test',
  onError: (e) => {
    console.log(e);
  },
  onSubmit: (data) => {
    console.log(data);
  },
  configuration: exampleConfiguration,
  uiConfiguration: exampleUiConfiguration,
};

const configWithCustomValidation = Object.assign({}, exampleConfiguration);

configWithCustomValidation.captureTimestamp.validation = {
  required: true,
  // @ts-ignore
  validationFunctions: ['date'],
};

export const WithCustomValidation = Template.bind({});
// @ts-ignore
Default.args = {
  formId: 'test',
  onError: (e) => {
    console.log(e);
  },
  onSubmit: (data) => {
    console.log(data);
  },
  configuration: configWithCustomValidation,
  uiConfiguration: exampleUiConfiguration,
  validationFunctions: {
    date: (value: string) => {
      console.log(
        'validate',
        value !== undefined && new Date() > new Date(value)
      );
      if (value !== undefined && new Date() > new Date(value)) {
        return 'Date must be in the future.';
      } else {
        return undefined;
      }
    },
  },
};

configWithCustomValidation.captureTimestamp.validation = {
  required: true,
};

export const WithWatchedValues = Template.bind({});
// @ts-ignore
Default.args = {
  initialValues: { captureTimestamp: '2022-12-12T12:00:00Z' },
  formId: 'test',
  onError: (e) => {
    console.log(e);
  },
  onSubmit: (data) => {
    console.log(data);
  },
  configuration: configWithCustomValidation,
  uiConfiguration: exampleUiConfiguration,
  fieldsToWatch: ['captureTimestamp'],
  onPublishValues: (values, previousValues) => {
    console.log(values, previousValues);
  },
};

// with initial values
export const InitialValues = Template.bind({});
// @ts-ignore
InitialValues.args = {
  formId: 'test_initial_values',
  onError: (e) => {
    console.log(e);
  },
  onSubmit: (data) => {
    console.log(data);
  },
  initialValues: {
    sensor: '1',
    title: 'Initial Title',
    country: 'DE',
    country_solo: 'Germany',
    dataType: '1',
  },
  configuration: exampleConfiguration,
  uiConfiguration: exampleUiConfiguration,
};

export const MultipleFields = Template.bind({});
// @ts-ignore
MultipleFields.args = {
  initialValues: { test_2: '1' },
  loadingFields: [],
  onSetIsDirty: (e: any) => {
    console.log(e);
  },
  formId: 'test',
  sections: [
    {
      title: 'General',
      fields: [
        { key: 'test', type: FIELD_TYPES.TEXTFIELD, validation: {} },
        {
          label: 'test',
          key: 'test_2',
          type: FIELD_TYPES.SELECT,
          options: [
            { label: 'test 1', value: 1 },
            { label: 'test 2', value: 2 },
          ],
          validation: {},
        },
      ],
    },
  ],
};

export const CheckboxFields = Template.bind({});
// @ts-ignore
CheckboxFields.args = {
  initialValues: { test_2: true },
  loadingFields: [],
  onSetIsDirty: (e: any) => {
    console.log(e);
  },
  sections: [
    {
      title: 'General',
      fields: [
        { key: 'test', type: FIELD_TYPES.BOOL, validation: {} },
        {
          label: 'test',
          key: 'test_2',
          type: FIELD_TYPES.BOOL,
          validation: {},
        },
      ],
    },
  ],
};
