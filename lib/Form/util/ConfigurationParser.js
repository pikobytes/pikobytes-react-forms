/**
 * Created by nicolas.looschen@pikobytes.de on 03.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import Ajv from "ajv/dist/2020";
import { default as configurationSchema } from "../schema/configurationSchema.json";
import { default as uiConfigurationSchema } from "../schema/uiConfigurationSchema.json";
import FIELD_TYPES from "../typedefs/FieldTypes";
var parseField = function (field) {
    switch (field.fieldType) {
        case FIELD_TYPES.SELECT:
            var newCustomProperties = Object.assign({}, field.customProperties, { options: field === null || field === void 0 ? void 0 : field.options });
            return Object.assign({}, field, { customProperties: newCustomProperties });
        default:
            return field;
    }
};
var parseSpecialConfigurationFields = function (validConfiguration) {
    var parsedConfiguration = {};
    Object.keys(validConfiguration).forEach(function (field) {
        parsedConfiguration[field] = parseField(validConfiguration[field]);
    });
    return parsedConfiguration;
};
export var validateConfiguration = function (configuration, schema) {
    var ajv = new Ajv();
    var validate = ajv.compile(schema);
    var isValid = validate(configuration);
    if (isValid) {
        return configuration;
    }
    else {
        console.error(validate.errors);
        throw new Error("The configuration file is incorrect.");
    }
};
export var validateUiConfiguration = function (configuration) {
    return validateConfiguration(configuration, uiConfigurationSchema);
};
export var validateFieldConfiguration = function (configuration) {
    var validConfiguration = validateConfiguration(configuration, configurationSchema);
    return parseSpecialConfigurationFields(validConfiguration);
};
