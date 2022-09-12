/**
 * Created by nicolas.looschen@pikobytes.de on 03.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import Select from '../components/Inputs/Select/Select';
import TextField from '../components/Inputs/TextField/TextField';
import TagManagementContainer from '../components/Inputs/TagManagement/TagManagementContainer';
import Checkbox from '../components/Inputs/Checkbox/Checkbox';
import DatePicker from '../components/Inputs/DatePicker/DatePicker';
import { IDefaultUiSettings, IGenericField } from '../typedefs/FieldConfiguration';
export declare const mapField: (fieldType: string, customMapping?: {
    [key: string]: React.ComponentType<IGenericField<IDefaultUiSettings, any>>;
} | undefined) => React.ComponentType<IGenericField<IDefaultUiSettings, any>>;
/**
 * Map custom field types to components
 */
export declare const mapCustomFields: (fieldType: string, customMapping: {
    [key: string]: React.ComponentType<IGenericField<IDefaultUiSettings, any>>;
}) => React.ComponentType<IGenericField<IDefaultUiSettings, any>>;
/**
 * Maps a field type to a corresponding field component
 * @param fieldType
 */
export declare const mapDefaultFields: (fieldType: string) => (({ customProperties: { options, registerReturn, ...rest }, fieldId, uiSettings: { disabled, description, label, placeholder, size, variant }, validation, }: IGenericField<IDefaultUiSettings, import("../typedefs/FieldConfiguration").IAutocompleteCustomProperties>) => JSX.Element) | typeof Checkbox | typeof Select | typeof TagManagementContainer | typeof DatePicker | typeof TextField | undefined;
