/**
 * Created by nicolas.looschen@pikobytes.de on 03.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import Ajv from 'ajv';

import {default as configurationSchema} from "../schema/configurationSchema.json";
import {default as uiConfigurationSchema} from "../schema/uiConfigurationSchema.json";
import {IDefaultUiSettings, IGenericField, ISection} from "../typedefs/IField";


export const validateConfiguration = (configuration: any, schema: Object) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const isValid = validate(configuration);

    if (isValid) {
        return configuration;
    } else {
        console.error(validate.errors);
        throw new Error("The configuration file is incorrect.")
    }
}


export const validateUiConfiguration = (configuration: any) => {
    return validateConfiguration(configuration, uiConfigurationSchema) as { sections?: Array<ISection> } & { [key: string]: IDefaultUiSettings }
}

export const validateFieldConfiguration = (configuration: any) => {
    return validateConfiguration(configuration, configurationSchema) as { [key: string]: IGenericField<any, any> };
}