/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export enum PREVIEW_TYPE {
    SERVER,
    SESSION,
}

export enum ESuggestionType {
    Place = 'PLACE',
    Field = 'FIELD',
}

export interface ISuggestion {
    name: string;
    icon: string;
}

export enum EOperator {
    MATCH_PHRASE = 'match_phrase',
    QUERY_STRING = 'query_string',
    DATE_LTE = 'date_lte',
    DATE_GTE = 'date_gte',
    NUMBER_LTE = 'number_lte',
    NUMBER_GTE = 'number_gte',
    WILDCARD = 'wildcard',
}

export interface ISuggestionUploadAutosuggest extends ISuggestion {
    icon: 'unknown';
    value: string;
    operator: EOperator.WILDCARD;
    type: ESuggestionType.Field;
}