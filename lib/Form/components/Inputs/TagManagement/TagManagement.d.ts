/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
/// <reference types="react" />
import { ITagManagement, ITagManagementUiSettings } from '../../../typedefs/IField';
import { ITagObject } from './typedefs';
interface ITagManagementProps {
    onTagCreate: (tag: string, tagObject: ITagObject) => void;
    onTagRemove: (tag: string, tagObject: ITagObject) => void;
    onTagRemoveReversed: (tag: string, tagObject: ITagObject) => void;
    tags: Array<string>;
    tagsToDelete: Array<string>;
}
/**
 * Component allowing to add or remove tags.
 */
export declare const TagManagement: (props: ITagManagement<ITagManagementUiSettings> & ITagManagementProps) => JSX.Element;
export default TagManagement;
