/**
 * Created by nicolas.looschen@pikobytes.de on 06.07.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';

import Autocomplete from './Autocomplete';
import { FormProviderWrapper } from '../../Form/Form.stories';

export default {
  title: 'Example/Autocomplete',
  component: Autocomplete,
};

function Template(args: any) {
  return <FormProviderWrapper>
    <Autocomplete {...args} />
  </FormProviderWrapper>;
}


export const Default = Template.bind({});
// @ts-ignore
Default.args = {
  customProperties: {
    options: [{ label: 'test 1', value: 1 }, { label: 'test 2', value: 3 }, { label: 'test 3', value: 1 }],
  },
  uiSettings: {
    label: 'Test Select',
    placeholder: 'Test Selection',
  },
  fieldId: 'test_select',
  validation: { required: true },
  register: () => {
    return {
      ref: () => {
      },
    };
  },
};

