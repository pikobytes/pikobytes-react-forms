/**
 * Created by nicolas.looschen@pikobytes.de on 03/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import { IDefaultUiSettings, ITextField } from '../../../typedefs/FieldConfiguration';
export default function TextField(props: ITextField<IDefaultUiSettings> & {
    endAdornments?: Array<React.ComponentType>;
}): JSX.Element;
