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
  control?: Control;
  defaultValue?: any;
  error?: {
    type: string;
    message: string;
  };
  field: IField;
  formField?: ControllerRenderProps;
  isEdit?: boolean;
  loading?: boolean;
  onSelect?: (...event: any[]) => void;
  register?: UseFormRegister<any>;
  registerReturn?: UseFormRegisterReturn;
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
    control,
    defaultValue,
    error,
    field,
    loading,
    onResetError,
    onSetError,
    register,
    rules,
    setFormIsDirty,
    variant,
  } = props;

  const { type } = field;
  switch (type) {
    // case FIELD_TYPES.AUTOSUGGEST:
    //   return (
    //     <Controller
    //       control={control}
    //       name={field.key}
    //       defaultValue={defaultValue}
    //       rules={rules}
    //       render={(props) => (
    //         <Autosuggest
    //           error={error}
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
          defaultValue={defaultValue}
          error={error}
          field={field}
          register={register}
        />
      );
    case FIELD_TYPES.SELECT:
      return (
        <Controller
          control={control}
          name={field.key}
          defaultValue={defaultValue}
          rules={rules}
          render={(props) => (
            <Select
              error={error}
              field={field}
              formField={props.field}
              variant={variant}
            />
          )}
        />
      );
    // case FIELD_TYPES.GEOMETRY:
    //   return (
    //     <Controller
    //       control={control}
    //       name={field.key}
    //       defaultValue={defaultValue}
    //       render={(props) => (
    //         <DrawEditGeometry
    //           required={field.required}
    //           name={field.key}
    //           formField={props.field}
    //           onResetError={onResetError}
    //           onSetError={onSetError}
    //           error={error}
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
          control={control}
          defaultValue={defaultValue}
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
      return (
        <Controller
          name={field.key}
          control={control}
          defaultValue={defaultValue}
          render={(props) => (
            <DateTimePicker
              field={field}
              formField={props.field}
              error={error}
              variant={variant}
            />
          )}
          rules={rules}
        />
      );
    // case FIELD_TYPES.FILE:
    //   return (
    //     <ModifyFile
    //       error={error}
    //       defaultValue={defaultValue}
    //       field={field}
    //       loading={loading}
    //       setFormIsDirty={setFormIsDirty}
    //       register={register}
    //       variant={variant}
    //     />
    //   );
    // case FIELD_TYPES.PUBLICATION:
    //   return (
    //     <Controller
    //       name={field.key}
    //       control={control}
    //       defaultValue={defaultValue}
    //       render={(props) => (
    //         <Publications
    //           error={error}
    //           field={field}
    //           formField={props.field}
    //           loading={loading}
    //           register={register}
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
          error={error}
          field={field}
          loading={loading}
          register={register}
          variant={variant}
        />
      );
  }
}
