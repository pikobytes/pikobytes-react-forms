/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form';

import { IField, IValidation } from '../../typedefs/IField';
import FIELD_TYPES from '../../typedefs/FieldTypes';
import CheckBox from '../Inputs/Checkbox/Checkbox';
import Select from '../Inputs/Select/Select';
import TextField from '../Inputs/TextField/TextField';
import { TagManagementContainer } from '../Inputs/TagManagement/TagManagementContainer';
import DateTimePicker from '../Inputs/DateTimePicker/DateTimePicker';
// import DrawEditGeometry from '../Inputs/DrawEditGeometry/DrawEditGeometry.unsupported';
// import ModifyFile from '../Inputs/ModifyFile.unsupported';
// import Autosuggest from '../Inputs/Autosuggest.unsupported';
// import Publications from '../Inputs/Publications/Publications.unsupported';

export interface FieldProps {
  field: IField;
  formField?: ControllerRenderProps;
  isEdit?: boolean;
  loading?: boolean;
  rules?: IValidation;
  value?: string | number;
  variant?: 'filled' | 'outlined' | 'standard';
}

export default function Field(
  props: FieldProps & {
    onResetError: UseFormReturn['clearErrors'];
    onSetError: UseFormReturn['setError'];
    setFormIsDirty: (dirty: boolean) => void;
  }
) {
  const {
    field,
    loading,
    rules,
    variant,
  } = props;

  const { type } = field;
  switch (type) {
    // case FIELD_TYPES.AUTOSUGGEST:
    //   return (
    //     <Controller
    //       name={field.key}
    //       rules={rules}
    //       render={(props) => (
    //         <Autosuggest
    //           field={props.field}
    //           formField={field}
    //           variant={variant}
    //         />
    //       )}
    //     />
    //   );
    case FIELD_TYPES.BOOL:
      return (
        <CheckBox
          field={field}
        />
      );
    case FIELD_TYPES.SELECT:
      return (
          <Select
              field={field}
              loading={loading}
              variant={variant}
          />
      );
    // case FIELD_TYPES.GEOMETRY:
    //   return (
    //     <Controller
    //       name={field.key}
    //       render={(props) => (
    //         <DrawEditGeometry
    //           required={field.required}
    //           name={field.key}
    //           formField={props.field}
    //           onResetError={onResetError}
    //           onSetError={onSetError}
    //           variant={variant}
    //         />
    //       )}
    //       rules={rules}
    //     />
    //   );
    case FIELD_TYPES.TAGS:
      return (
        <Controller
          name={field.key}
          render={(props) => (
            <TagManagementContainer
              field={field}
              formField={props.field}
              variant={variant}
            />
          )}
          rules={rules}
        />
      );
    case FIELD_TYPES.DATE:
      return (<DateTimePicker
              field={field}
              variant={variant}
            />
          );

    // case FIELD_TYPES.FILE:
    //   return (
    //     <ModifyFile
    //       field={field}
    //       loading={loading}
    //       setFormIsDirty={setFormIsDirty}
    //       variant={variant}
    //     />
    //   );
    // case FIELD_TYPES.PUBLICATION:
    //   return (
    //     <Controller
    //       name={field.key}
    //       render={(props) => (
    //         <Publications
    //           field={field}
    //           formField={props.field}
    //           loading={loading}
    //           variant={variant}
    //         />
    //       )}
    //       rules={rules}
    //     />
    //   );
    case FIELD_TYPES.STRING:
    case FIELD_TYPES.NUMBER:
    case FIELD_TYPES.TEXTFIELD:
    default:
      return (
        <TextField
          field={field}
          loading={loading}
          variant={variant}
        />
      );
  }
}
