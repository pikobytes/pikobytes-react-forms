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
export declare type TCustomMapping = TStringIndexableObject<React.ComponentType<IGenericField<IDefaultUiSettings, any>>>;
export declare type TFieldValue = string | number | boolean;
export declare type TSize = 'small' | 'medium';
export declare type TStringIndexableObject<T> = {
    [k: string]: T;
};
export declare type TVariant = 'filled' | 'outlined' | 'standard';
export declare type TValidationFunction = (v: any) => boolean | string | undefined;
export declare type TValidationFunctionLookup = TStringIndexableObject<TValidationFunction>;
