/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
/// <reference types="react" />
import { IDefaultUiSettings, IGenericField, ISelectCustomProperties } from '../../../typedefs/FieldConfiguration';
export declare const EMPTY_VALUE = "none";
export default function Select({ customProperties: { options, registerReturn }, fieldId, uiSettings: { disabled, label, placeholder, size, variant }, validation, }: IGenericField<IDefaultUiSettings, ISelectCustomProperties>): JSX.Element;
