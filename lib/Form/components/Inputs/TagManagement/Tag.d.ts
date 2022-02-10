/**
 * Created by nicolas.looschen@pikobytes.de on 16/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
interface TagProps {
    isDelete: boolean;
    onToggleTag(tag: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    tag: string;
}
export declare function Tag(props: TagProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Tag>;
export default _default;
