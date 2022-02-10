/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { E_VALIDATION_FUNCTION_REGISTRY } from '../configuration/ValidationFunctionConfiguration';
import { ERROR_MESSAGE_KEY } from '../typedefs/ErrorMessages';
export declare function validateGeometry(): boolean;
interface joinInCustomValidationParameters {
    [key: string]: E_VALIDATION_FUNCTION_REGISTRY;
}
interface joinInCustomValidationReturnType {
    [key: string]: (validationFunction: string) => boolean | ERROR_MESSAGE_KEY;
}
export declare function joinInCustomValidation(customValidationFunctions: joinInCustomValidationParameters): {
    validate: joinInCustomValidationReturnType;
};
export {};
