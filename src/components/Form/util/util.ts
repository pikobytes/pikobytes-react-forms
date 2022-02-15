/**
 * Created by nicolas.looschen@pikobytes.de on 04.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { MANUAL_DIRTY_TRIGGER_ID } from '../Form';
import FIELD_TYPES from '../../../typedefs/FieldTypes';
import { IFieldConfig } from '../../../typedefs/FieldConfiguration';
import {
  TStringIndexableObject,
  TValidationFunctionLookup,
} from '../../../typedefs/typedefs';

export const cloneValues = (val: any) =>
  typeof val === 'object' && val !== null ? Object.assign({}, val) : val;

export const getDefaultValues = (
  initialValues: TStringIndexableObject<string | undefined> | undefined,
  fieldConfig: IFieldConfig
) => {
  // create empty default values for all fields without default values in the config
  const fieldKeys = Object.keys(fieldConfig);
  const defaultValues: TStringIndexableObject<string | boolean> = {};
  fieldKeys.forEach((k) => {
    defaultValues[k] =
      fieldConfig[k].defaultValue ??
      getDefaultValueForFieldType(fieldConfig[k].fieldType);
  });

  const definedInitialValues: TStringIndexableObject<string> = {};
  if (initialValues !== undefined) {
    Object.entries(initialValues).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        definedInitialValues[k] = v;
      }
    });
  }

  // add default value for dirty trigger field, overwrite empty entries with initialValues
  return Object.assign(
    { [MANUAL_DIRTY_TRIGGER_ID]: '' },
    defaultValues,
    definedInitialValues
  );
};

export const getDefaultValueForFieldType = (fieldType: FIELD_TYPES) => {
  switch (fieldType) {
    case FIELD_TYPES.BOOLEAN:
    case FIELD_TYPES.BOOL:
      return false;
    default:
      return '';
  }
};

export const getDependentOnFields = (fieldConfigs: IFieldConfig) => {
  const fieldsWithCondition = new Set();

  Object.values(fieldConfigs).forEach((fieldConfig) => {
    if (fieldConfig.condition !== undefined) {
      const { effect, ...rest } = fieldConfig.condition;

      Object.keys(rest).forEach((field) => fieldsWithCondition.add(field));
    }
  });

  const allFields = Object.keys(fieldConfigs);
  const dependentOnFields = Array.from(fieldsWithCondition) as Array<string>;

  // instead of just checking if there exists a field which cannot be found
  // within the configuration, also print out which field could not be found
  dependentOnFields.forEach((dependentOnField) => {
    if (!allFields.includes(dependentOnField)) {
      throw new Error(
        `A condition depends on the field ${dependentOnField} which cannot be found in the supplied configuration.`
      );
    }
  });

  return dependentOnFields;
};

export const resolveValidationFunctions = (
  validationFunctionLookup?: TValidationFunctionLookup,
  validationFunctions?: Array<string>
) => {
  if (validationFunctions !== undefined) {
    const validate: TValidationFunctionLookup = {};

    validationFunctions.forEach((validationFunction) => {
      if (validationFunctionLookup !== undefined) {
        const fn = validationFunctionLookup[validationFunction];

        if (fn === undefined || typeof fn !== 'function') {
          throw new Error(
            `The validation function reference with ${validationFunction} is either not defined or invalid.`
          );
        } else {
          validate[validationFunction] = fn;
        }
      } else {
        throw new Error(
          'The validation function lookup is empty. It has to be supplied to support validation Functions.'
        );
      }
    });
    return { validate };
  }

  return {};
};
