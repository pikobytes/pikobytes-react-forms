/**
 * Created by nicolas.looschen@pikobytes.de on 04.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { MANUAL_DIRTY_TRIGGER_ID } from './Form';
import FIELD_TYPES from '../../typedefs/FieldTypes';
import { IFieldConfig, IGenericField } from '../../typedefs/FieldConfiguration';
import { TStringIndexableObject } from '../../typedefs/typedefs';
import {
  E_CONDITION_EFFECTS,
  E_FIELD_CONDITION_TYPES,
  IFieldCondition,
  IPatternCondition,
  IRangeCondition,
  IValueCondition,
  IValuesCondition,
} from '../../typedefs/ConditionalFields';

export const cloneValues = (val: any) =>
  typeof val === 'object' && val !== null ? Object.assign({}, val) : val;

const matchValueCondition = (
  condition: IValueCondition,
  fieldValue: string | number
) => {
  const { value } = condition;
  return value === fieldValue;
};

const matchValuesCondition = (
  condition: IValuesCondition,
  fieldValue: string | number
) => {
  const { value } = condition;
  return value.includes(fieldValue);
};

const matchPatternCondition = (
  condition: IPatternCondition,
  fieldValue: string | number
) => {
  const { value } = condition;

  const regexp = new RegExp(value);
  return regexp.test(fieldValue.toString());
};

const matchRangeCondition = (
  condition: IRangeCondition,
  fieldValue: number
) => {
  const { value } = condition;

  return fieldValue >= value[0] && fieldValue <= value[1];
};

export const matchFieldCondition = (
  condition: IFieldCondition,
  fieldValue: string | number
) => {
  switch (condition.type) {
    case E_FIELD_CONDITION_TYPES.VALUE:
      return matchValueCondition(condition as IValueCondition, fieldValue);
    case E_FIELD_CONDITION_TYPES.VALUES:
      return matchValuesCondition(condition as IValuesCondition, fieldValue);
    case E_FIELD_CONDITION_TYPES.RANGE:
      return matchRangeCondition(
        condition as IRangeCondition,
        fieldValue as number
      );
    case E_FIELD_CONDITION_TYPES.PATTERN:
      return matchPatternCondition(condition as IPatternCondition, fieldValue);
    default:
      throw new Error('Unknown Condition Type.');
  }
};

export const applyConditions = (
  fieldValues: TStringIndexableObject<string | number>,
  conditions?: TStringIndexableObject<IFieldCondition>
) => {
  if (conditions === undefined) {
    return { effect: E_CONDITION_EFFECTS.DISPLAY, isMet: true };
  } else {
    const { effect, ...rest } = conditions;

    return {
      effect: effect as unknown as E_CONDITION_EFFECTS,
      isMet: Object.entries(rest)
        .map(([field, condition]) =>
          matchFieldCondition(condition, fieldValues[field])
        )
        .every((c) => c),
    };
  }
};

export const getDependentOnFields = (
  fieldConfigs: TStringIndexableObject<IGenericField<any, any>>
) => {
  const fieldsWithCondition = new Set();

  Object.values(fieldConfigs).forEach((fieldConfig) => {
    if (fieldConfig.condition !== undefined) {
      const { effect, ...rest } = fieldConfig.condition;

      Object.keys(rest).forEach((field) => fieldsWithCondition.add(field));
    }
  });

  return Array.from(fieldsWithCondition) as Array<string>;
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
