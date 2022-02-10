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
export var isFieldUnset = function (fieldValue) {
    return fieldValue === undefined ||
        fieldValue === null ||
        fieldValue.length === 0 ||
        fieldValue === '' ||
        fieldValue === '...';
};
/**
 * checks if the value is set
 * @param fieldValue
 */
export var isFieldSet = function (fieldValue) {
    return !isFieldUnset(fieldValue);
};
/**
 * Returns either the content of a field or the content of a fallback field
 * if both are undefined => undefined is returned
 * @param mappingKey - key in the fieldMapping
 * @param item - actual data item
 * @param fieldMapping
 * @param fallbacks
 */
export var getFieldContent = function (mappingKey, item, fieldMapping, fallbacks) {
    var field = fieldMapping[mappingKey];
    if (isFieldSet(item[field])) {
        return item[field];
    }
    else if (fallbacks !== undefined && fallbacks[mappingKey] !== undefined) {
        var fallbackField = fieldMapping[fallbacks[mappingKey]];
        return item[fallbackField];
    }
    return undefined;
};
