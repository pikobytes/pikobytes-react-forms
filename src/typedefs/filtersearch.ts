/**
 * Created by jacob.mendt@pikobytes.de on 02.02.21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export enum ESuggestionType {
  Place = 'PLACE',
  Field = 'FIELD',
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

export interface IFilterField {
  hash: string;
  value: IFilterFieldValue;
}

export interface IFilterFieldValue {
  fieldType: string[];
  name: string;
  type: ESuggestionType.Field;
  value: string | number;
  operator: EOperator;
}

export interface IFilterSearch {
  extent?: number[];
  fields: { hash: string; value: IFilterFieldValue }[];
  zoom?: number;
}

export interface IFilterState {
  hash: string;
  value: IFilterFieldValue;
}
