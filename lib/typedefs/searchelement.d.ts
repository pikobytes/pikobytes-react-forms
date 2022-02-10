/**
 * Created by jacob.mendt@pikobytes.de on 02.02.21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
export declare enum ESearchType {
    document = "document",
    grid = "grid"
}
interface IGeoJsonFeature {
    type: string;
    geometry: {
        type: string;
        coordinates: [number, number] | [number, number][];
    };
}
export interface ISearchElement extends IGeoJsonFeature {
    type: string;
    id: string;
    properties: {
        id: string;
        count: number;
        type: ESearchType;
        objectType?: string;
    };
    geometryRaw?: {
        type: string;
        coordinates: [number, number] | [number, number][];
    };
    customProperties: Object;
}
export {};
