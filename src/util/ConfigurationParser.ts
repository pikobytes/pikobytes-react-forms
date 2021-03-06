/**
 * Created by nicolas.looschen@pikobytes.de on 03.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import Ajv from 'ajv/dist/2020';

import { default as configurationSchema } from '../schema/configurationSchema.json';
import { default as uiConfigurationSchema } from '../schema/uiConfigurationSchema.json';
import FIELD_TYPES from '../typedefs/FieldTypes';
import {
  IDefaultUiSettings,
  IParsedGenericField,
} from '../typedefs/FieldConfiguration';
import { ISection, TStringIndexableObject } from '../typedefs/typedefs';

const parseField = (
  field: { fieldType: string } & TStringIndexableObject<any>,
) => {
  switch (field.fieldType) {
    case FIELD_TYPES.SELECT:
    case FIELD_TYPES.AUTOCOMPLETE:
      const newCustomProperties = Object.assign({}, field.customProperties, {
        options: field?.options,
      });

      return Object.assign({}, field, {
        customProperties: newCustomProperties,
      });
    default:
      return field;
  }
};

const parseSpecialConfigurationFields = (validConfiguration: any) => {
  const parsedConfiguration: TStringIndexableObject<IParsedGenericField<any, any>> = {};

  Object.keys(validConfiguration).forEach((field) => {
    parsedConfiguration[field] = parseField(
      validConfiguration[field],
    ) as IParsedGenericField<any, any>;
  });

  return parsedConfiguration;
};

export const validateConfiguration = (configuration: any, schema: Object) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  const isValid = validate(configuration);

  if (isValid) {
    return configuration;
  } else {
    console.error(validate.errors);
    throw new Error('The configuration file is incorrect.');
  }
};

export const validateUiConfiguration = (configuration: any) => {
  return validateConfiguration(configuration, uiConfigurationSchema) as {
    sections?: Array<ISection>;
  } & { [key: string]: IDefaultUiSettings };
};

export const validateFieldConfiguration = (configuration: any) => {
  const validConfiguration = validateConfiguration(
    configuration,
    configurationSchema,
  );

  return parseSpecialConfigurationFields(validConfiguration) as {
    [key: string]: IParsedGenericField<any, any>;
  };
};
