/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { VALIDATION_FUNCTION_MAPPING, } from '../configuration/ValidationFunctionConfiguration';
export function validateGeometry() {
    return false;
}
export function joinInCustomValidation(customValidationFunctions) {
    var result = {};
    Object.keys(customValidationFunctions).forEach(function (customValidationFunction) {
        result[customValidationFunction] =
            VALIDATION_FUNCTION_MAPPING[customValidationFunctions[customValidationFunction]];
    });
    return { validate: result };
}
