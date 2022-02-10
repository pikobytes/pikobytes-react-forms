/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { validateGeometry } from '../util/validation';
export declare enum E_VALIDATION_FUNCTION_REGISTRY {
    GEOMETRY = "geometry"
}
export declare const VALIDATION_FUNCTION_MAPPING: {
    geometry: typeof validateGeometry;
};
