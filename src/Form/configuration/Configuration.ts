/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import FIELDS from './Fields';

export const CONFIGURATION = {
    fields: FIELDS,
    types: {
        example: {
            id: 'example',
            fields: Object.keys(FIELDS),
        },
    },
};
