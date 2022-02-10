/**
 * Created by jacob.mendt@pikobytes.de on 01.02.21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
export declare enum EViews {
    viewDetails = "viewDetails",
    viewList = "viewList"
}
export declare enum EFormats {
    Meter = "meter",
    String = "string",
    Date = "date",
    DateTimeLocal = "datetime-local",
    FileSize = "file-size",
    Float = "float",
    EMail = "email",
    Url = "url"
}
export interface IFieldConfigurationEntry {
    label: string;
    type: string;
    format: string;
    validation: {
        required: boolean;
        customValidationFunctions?: Array<string>;
    };
}
export declare type ViewConfiguration = {
    hideableFields?: Array<string>;
    fallbacks?: {
        [key: string]: string;
    };
    fieldConfiguration?: {
        [key: string]: string;
    };
    fieldMapping: {
        [key: string]: string;
    };
    layoutComponent: string;
};
export declare type Entity = Record<EViews, ViewConfiguration> & {
    fieldConfiguration?: {
        [key: string]: string;
    };
};
export interface IConfiguration {
    entities: {
        [key: string]: Entity;
    };
    index: {
        fields: {
            label: string;
            type: string;
            icon?: string;
        }[];
    };
    search: {
        fields: string[];
        quickFilter: IQuickFilterConfiguration[];
    };
    [key: string]: any;
}
export interface IQuickFilterConfiguration {
    field: string;
    values: string[];
    useIndex: boolean;
    maxLength?: number;
}
