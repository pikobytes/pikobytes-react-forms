/**
 * Created by nicolas.looschen@pikobytes.de on 3/18/21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
/**
 * checks if the value is not set
 * @param fieldValue
 */
export declare const isFieldUnset: (fieldValue: string) => boolean;
/**
 * checks if the value is set
 * @param fieldValue
 */
export declare const isFieldSet: (fieldValue: string) => boolean;
/**
 * Returns either the content of a field or the content of a fallback field
 * if both are undefined => undefined is returned
 * @param mappingKey - key in the fieldMapping
 * @param item - actual data item
 * @param fieldMapping
 * @param fallbacks
 */
export declare const getFieldContent: (mappingKey: string, item: {
    [key: string]: string;
}, fieldMapping: {
    [key: string]: string;
}, fallbacks?: {
    [key: string]: string;
} | undefined) => string | undefined;
