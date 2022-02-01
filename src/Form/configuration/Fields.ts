/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import FIELD_TYPES from '../typedefs/FieldTypes';
import { IField } from '../typedefs/IField';
import { ERROR_MESSAGE_KEY } from '../typedefs/ErrorMessages';
import { E_VALIDATION_FUNCTION_REGISTRY } from './ValidationFunctionConfiguration';

const FIELDS: { [name: string]: IField } = {
  geometry: {
    placeholder: undefined,
    tooltip: undefined,
    type: FIELD_TYPES.GEOMETRY,
    key: 'geometry',
    validation: {
      required: false,
      customValidationFunctions: {
        valGeo: E_VALIDATION_FUNCTION_REGISTRY.GEOMETRY,
      },
    },
  },
  editor: {
    placeholder: 'e.g. Max Mustermann',
    type: FIELD_TYPES.STRING,
    label: 'editor',
    key: 'editor',
    validation: {
      required: ERROR_MESSAGE_KEY.REQUIRED,
    },
  },
  tags: {
    placeholder: '...',
    type: FIELD_TYPES.TAGS,
    label: 'tags',
    key: 'tags',
    validation: {
      required: false,
    },
  },
  file: {
    type: FIELD_TYPES.FILE,
    label: 'file',
    key: 'file',
    validation: {
      required: ERROR_MESSAGE_KEY.REQUIRED,
    },
  },
  textBox: {
    type: FIELD_TYPES.TEXTFIELD,
    label: 'comment',
    key: 'comment',
    validation: {
      required: ERROR_MESSAGE_KEY.REQUIRED,
    },
  },
  select: {
    type: FIELD_TYPES.SELECT,
    label: 'selection',
    key: 'selection',
    options: [
      { label: 'select1', value: 0 },
      { label: 'select2', value: 1 },
      { label: 'select3', value: 3 },
    ],
    validation: {
      required: ERROR_MESSAGE_KEY.REQUIRED,
    },
  },
};

export default FIELDS;
