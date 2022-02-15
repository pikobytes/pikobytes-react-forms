/**
 * Created by nicolas.looschen@pikobytes.de on 03.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import FIELD_TYPES from '../typedefs/FieldTypes';
import Select from '../components/Inputs/Select/Select';
import DateTimePicker from '../components/Inputs/DateTimePicker/DateTimePicker';
import TextField from '../components/Inputs/TextField/TextField';
import TagManagementContainer from '../components/Inputs/TagManagement/TagManagementContainer';
import Checkbox from '../components/Inputs/Checkbox/Checkbox';
import DatePicker from '../components/Inputs/DatePicker/DatePicker';
import {
  IDefaultUiSettings,
  IGenericField,
} from '../typedefs/FieldConfiguration';

export const mapField = (
  fieldType: string,
  customMapping?: {
    [key: string]: React.ComponentType<IGenericField<IDefaultUiSettings, any>>;
  }
): React.ComponentType<IGenericField<IDefaultUiSettings, any>> => {
  let component;
  // first check the default field types
  if (component === undefined) {
    component = mapDefaultFields(fieldType);
  }

  // afterwards check the custom mapping if it defines a component for the provided fieldType
  if (customMapping !== undefined) {
    component = mapCustomFields(fieldType, customMapping);
  }

  // if the component is still undefined, throw an error
  if (component === undefined) {
    throw new Error(
      `There exists no component for the fieldType ${fieldType} please check your custom mappings and your configuration file.`
    );
  }

  return component;
};

/**
 * Map custom field types to components
 */
export const mapCustomFields = (
  fieldType: string,
  customMapping: {
    [key: string]: React.ComponentType<IGenericField<IDefaultUiSettings, any>>;
  }
) => {
  return customMapping[fieldType];
};

/**
 * Maps a field type to a corresponding field component
 * @param fieldType
 */
export const mapDefaultFields = (fieldType: string) => {
  switch (fieldType) {
    case FIELD_TYPES.BOOL:
    case FIELD_TYPES.BOOLEAN:
      return Checkbox;
    case FIELD_TYPES.SELECT:
      return Select;
    case FIELD_TYPES.TAGS:
      return TagManagementContainer;
    case FIELD_TYPES.DATE:
      return DatePicker;
    case FIELD_TYPES.DATETIME:
      return DateTimePicker;
    case FIELD_TYPES.STRING:
    case FIELD_TYPES.NUMBER:
    case FIELD_TYPES.TEXTFIELD:
      return TextField;
    default:
      return undefined;
  }
};
