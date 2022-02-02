/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import TagManagement from './TagManagement';
import { IField } from '../../../typedefs/IField';
import { ITagObject } from './typedefs';
import {isFieldSet} from "../../../util/fieldAccess";

export interface TagManagementContainerProps {
  field: IField;
  formField: ControllerRenderProps;
  variant?: 'filled' | 'outlined' | 'standard';
}

export function TagManagementContainer(props: TagManagementContainerProps) {
  const { field, formField, ...rest } = props;
  const { onChange, value } = formField;

  const onTagCreate = (tag: string, tagObject: ITagObject) => {
    tagObject.tags.push(tag);
    onChange(JSON.stringify(tagObject));
  };

  const onTagRemove = (tagToDelete: string, tagObject: ITagObject) => {
    if (field.isEdit) {
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
      field={field}
      onTagCreate={onTagCreate}
      onTagRemove={onTagRemove}
      onTagRemoveReversed={onTagRemoveAbort}
      tags={tags}
      tagsToDelete={tagsToDelete}
      {...rest}
    />
  );
}

export default TagManagementContainer;