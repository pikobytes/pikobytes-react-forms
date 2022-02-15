/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
var _a;
import { validateGeometry } from '../util/validation';
export var E_VALIDATION_FUNCTION_REGISTRY;
(function (E_VALIDATION_FUNCTION_REGISTRY) {
    E_VALIDATION_FUNCTION_REGISTRY["GEOMETRY"] = "geometry";
})(E_VALIDATION_FUNCTION_REGISTRY || (E_VALIDATION_FUNCTION_REGISTRY = {}));
export var VALIDATION_FUNCTION_MAPPING = (_a = {},
    _a[E_VALIDATION_FUNCTION_REGISTRY.GEOMETRY] = validateGeometry,
    _a);
