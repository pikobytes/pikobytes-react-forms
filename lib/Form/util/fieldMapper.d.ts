/**
 * Created by nicolas.looschen@pikobytes.de on 03.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import Select from "../components/Inputs/Select/Select";
import DateTimePicker from "../components/Inputs/DateTimePicker/DateTimePicker";
import TextField from "../components/Inputs/TextField/TextField";
import { IDefaultUiSettings, IGenericField } from "../typedefs/IField";
import TagManagementContainer from "../components/Inputs/TagManagement/TagManagementContainer";
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
export declare const mapDefaultFields: (fieldType: string) => typeof Select | typeof TagManagementContainer | typeof DateTimePicker | typeof TextField | undefined;
