/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
export var FIELD_TYPES;
(function (FIELD_TYPES) {
    FIELD_TYPES["AUTOCOMPLETE"] = "autocomplete";
    FIELD_TYPES["DATETIME"] = "datetime";
    FIELD_TYPES["DATE"] = "date";
    FIELD_TYPES["NUMBER"] = "number";
    FIELD_TYPES["STRING"] = "string";
    FIELD_TYPES["GEOMETRY"] = "geometry";
    FIELD_TYPES["TAGS"] = "tags";
    FIELD_TYPES["RANGE"] = "range";
    FIELD_TYPES["BOOL"] = "bool";
    FIELD_TYPES["BOOLEAN"] = "boolean";
    FIELD_TYPES["SELECT"] = "select";
    FIELD_TYPES["FILE"] = "file";
    FIELD_TYPES["TEXTFIELD"] = "textfield";
    FIELD_TYPES["PUBLICATION"] = "publication";
})(FIELD_TYPES || (FIELD_TYPES = {}));
export default FIELD_TYPES;
