/**
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import {
  E_CONDITION_EFFECTS,
  E_FIELD_CONDITION_TYPES,
  IFieldCondition,
  IPatternCondition,
  IRangeCondition,
  IValueCondition,
  IValuesCondition,
} from '../../../typedefs/ConditionalFields';
import {
  TFieldValue,
  TStringIndexableObject,
} from '../../../typedefs/typedefs';

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

export const matchFieldCondition = (
  condition: IFieldCondition,
  fieldValue: TFieldValue
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

const matchPatternCondition = (
  condition: IPatternCondition,
  fieldValue: TFieldValue
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

const matchValueCondition = (
  condition: IValueCondition,
  fieldValue: TFieldValue
) => {
  const { value } = condition;
  return value === fieldValue;
};

const matchValuesCondition = (
  condition: IValuesCondition,
  fieldValue: TFieldValue
) => {
  const { value } = condition;
  return value.includes(fieldValue);
};
