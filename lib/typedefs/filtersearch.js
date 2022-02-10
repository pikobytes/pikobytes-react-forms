/**
 * Created by jacob.mendt@pikobytes.de on 02.02.21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
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
