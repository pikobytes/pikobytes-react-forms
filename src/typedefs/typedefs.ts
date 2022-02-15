/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';

import { IDefaultUiSettings, IGenericField } from './FieldConfiguration';

export interface ISection {
  title?: string;
  fields: Array<string>;
}

export type TCustomMapping = TStringIndexableObject<
  React.ComponentType<IGenericField<IDefaultUiSettings, any>>
>;

export type TFieldValue = string | number | boolean;

export type TSize = 'small' | 'medium';

export type TStringIndexableObject<T> = { [k: string]: T };

export type TVariant = 'filled' | 'outlined' | 'standard';

export type TValidationFunction = (v: any) => boolean | string;

export type TValidationFunctionLookup =
  TStringIndexableObject<TValidationFunction>;
