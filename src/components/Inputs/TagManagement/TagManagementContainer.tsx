/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import { useController } from 'react-hook-form';

import TagManagement from './TagManagement';
import { ITagObject } from './typedefs';
import { isFieldSet } from '../../../util/fieldAccess';
import {
  IDefaultUiSettings,
  ITagManagement,
} from '../../../typedefs/FieldConfiguration';

export function TagManagementContainer(
  props: ITagManagement<IDefaultUiSettings>
) {
  const { customProperties, fieldId, validation } = props;

  const { isEdit } = customProperties ?? {};

  const { field } = useController({ name: fieldId, rules: validation });
  const { value, onChange } = field;

  const onTagCreate = (tag: string, tagObject: ITagObject) => {
    tagObject.tags.push(tag);
    onChange(JSON.stringify(tagObject));
  };

  const onTagRemove = (tagToDelete: string, tagObject: ITagObject) => {
    if (isEdit) {
      tagObject.tagsToDelete.push(tagToDelete);
    } else {
      tagObject.tags = tagObject.tags.filter((tag) => tag !== tagToDelete);
    }

    onChange(JSON.stringify(tagObject));
  };

  const onTagRemoveAbort = (tag: string, tagObject: ITagObject) => {
    const newTagsToDelete = tagObject.tagsToDelete.filter((t) => t !== tag);
    tagObject.tagsToDelete =
      newTagsToDelete.length === 0 ? [] : newTagsToDelete;
    onChange(JSON.stringify(tagObject));
  };

  const { tags, tagsToDelete } = isFieldSet(value)
    ? JSON.parse(value)
    : { tags: [], tagsToDelete: [] };

  return (
    <TagManagement
      onTagCreate={onTagCreate}
      onTagRemove={onTagRemove}
      onTagRemoveReversed={onTagRemoveAbort}
      tags={tags}
      tagsToDelete={tagsToDelete}
      {...props}
    />
  );
}

export default TagManagementContainer;
