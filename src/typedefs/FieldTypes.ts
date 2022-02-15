/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export enum FIELD_TYPES {
    AUTOSUGGEST = 'autosuggest',
    DATETIME = 'datetime',
    DATE = 'date',
    NUMBER = 'number',
    STRING = 'string',
    GEOMETRY = 'geometry',
    TAGS = 'tags',
    RANGE = 'range',
    BOOL = 'bool',
    BOOLEAN = "boolean",
    SELECT = 'select',
    FILE = 'file',
    TEXTFIELD = 'textfield',
    PUBLICATION = 'publication',
}

export default FIELD_TYPES;
