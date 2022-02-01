/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import FIELDS from '../configuration/Fields';
import { IField } from '../typedefs/IField';

interface getFieldsByIdType {
    (ids: Array<string>): Array<IField>;
}

export let getFieldsById: getFieldsByIdType;

getFieldsById = (ids) => {
    const result: Array<IField> = [];
    ids.forEach((id) => {
        result.push(FIELDS[id]);
    });

    return result;
};
