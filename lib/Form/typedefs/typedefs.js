/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
export var PREVIEW_TYPE;
(function (PREVIEW_TYPE) {
    PREVIEW_TYPE[PREVIEW_TYPE["SERVER"] = 0] = "SERVER";
    PREVIEW_TYPE[PREVIEW_TYPE["SESSION"] = 1] = "SESSION";
})(PREVIEW_TYPE || (PREVIEW_TYPE = {}));
export var ESuggestionType;
(function (ESuggestionType) {
    ESuggestionType["Place"] = "PLACE";
    ESuggestionType["Field"] = "FIELD";
})(ESuggestionType || (ESuggestionType = {}));
export var EOperator;
(function (EOperator) {
    EOperator["MATCH_PHRASE"] = "match_phrase";
    EOperator["QUERY_STRING"] = "query_string";
    EOperator["DATE_LTE"] = "date_lte";
    EOperator["DATE_GTE"] = "date_gte";
    EOperator["NUMBER_LTE"] = "number_lte";
    EOperator["NUMBER_GTE"] = "number_gte";
    EOperator["WILDCARD"] = "wildcard";
})(EOperator || (EOperator = {}));
