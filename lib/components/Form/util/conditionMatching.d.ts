/**
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { E_CONDITION_EFFECTS, IFieldCondition } from '../../../typedefs/ConditionalFields';
import { TFieldValue, TStringIndexableObject } from '../../../typedefs/typedefs';
export declare const applyConditions: (fieldValues: TStringIndexableObject<string | number>, conditions?: TStringIndexableObject<IFieldCondition>) => {
    effect: E_CONDITION_EFFECTS;
    isMet: boolean;
};
export declare const matchFieldCondition: (condition: IFieldCondition, fieldValue: TFieldValue) => boolean;
