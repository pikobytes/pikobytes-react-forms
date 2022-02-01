/**
 * Created by nicolas.looschen@pikobytes.de on 23/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export const DRAW_EDIT_GEOMETRY_NAMESPACE =
  'application:component.DrawEditGeometry';

export type eventHandlerParameter = {
  features: Array<IFeature>;
};

export interface IGeometry {
  coordinates: Array<number> | Array<number[]> | Array<number[][]>;
  type: string;
}

export interface IFeature {
  geometry: IGeometry;
}

export enum GEOMETRY_TYPES {
  NONE = 'None',
  POINT = 'Point',
  LINE = 'LineString',
  POLYGON = 'Polygon',
}
