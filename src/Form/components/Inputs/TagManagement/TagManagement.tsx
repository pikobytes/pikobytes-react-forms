/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, {useRef} from 'react';
import {Grid, IconButton, TextField, Tooltip} from '@mui/material';
import {Add as AddIcon} from '@mui/icons-material';

import Tag from './Tag';
import {ITagManagement, ITagManagementUiSettings} from '../../../typedefs/IField';
import {ITagObject} from './typedefs';

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
export const TagManagement = (props: ITagManagement<ITagManagementUiSettings> & ITagManagementProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
        uiSettings: {
            addButtonTooltip = "Add Tag",
            disabled,
            label,
            placeholder,
            variant
        },
        validation: {
            required,
        },
        onTagCreate,
        onTagRemove,
        onTagRemoveReversed,
        tags,
        tagsToDelete,
    } = props;


    /**
     * Signals that we create a new tag
     * @param {string} tag
     */
    const createTag = (tag: string) => {
        if (onTagCreate !== undefined && !tags.includes(tag)) {
            onTagCreate(tag, {tags, tagsToDelete});
        }

        // reset input field
        if (inputRef.current !== null && inputRef.current !== undefined) {
            inputRef.current.value = '';
        }
    };

    /**
     * Signals that we want to remove a tag from tags
     * @param {string} tag
     */
    const removeTag = (tag: string) => {
        if (onTagRemove !== undefined) {
            onTagRemove(tag, {
                tags,
                tagsToDelete: tagsToDelete === undefined ? [] : tagsToDelete,
            });
        }
    };

    /**
     * On click it adds a tag to the tags container
     */
    const onClickAdd = () => {
        // it is not allowed to add empty values
        if (inputRef.current !== null && inputRef.current.value.length > 0) {
            createTag(inputRef?.current.value);
        }
    };

    /**
     * EventListener for a onKeyPress event. This allows us to catch enter events.
     * @param {string} tag - which was clicked
     * @param {*} event
     */
    const onClickToggleTag = (
        tag: string,
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        // prevent the default behavior because this could lead to unwanted side effects
        // on parent components
        event.preventDefault();
        event.stopPropagation();
        if (tagsToDelete !== undefined && tagsToDelete.includes(tag)) {
            onTagRemoveReversed(tag, {tags, tagsToDelete});
        } else {
            removeTag(tag);
        }
    };

    /**
     * EventListener for a onKeyPress event. This allows us to catch enter events.
     * @param {*} event
     */
    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // prevent the default behavior because this could lead to unwanted side effects
            // on parent components
            event.preventDefault();
            event.stopPropagation();

            onClickAdd();
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid alignItems="center" container spacing={1}>
                    <Grid item xs>
                        <TextField
                            disabled={disabled}
                            fullWidth
                            inputProps={{
                                className: 'input',
                                type: 'text',
                                autoComplete: 'on',
                                ref: inputRef,
                                onKeyPress: onKeyPress,
                            }}
                            InputLabelProps={{shrink: true, required: required !== false}}
                            label={label}
                            placeholder={placeholder}
                            variant={variant}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <Tooltip title={addButtonTooltip}>
                            <IconButton className="button" onClick={onClickAdd}>
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={1}>
                    {tags.map((tag) => {
                        const isDelete =
                            tagsToDelete === undefined || tagsToDelete.length === 0
                                ? false
                                : tagsToDelete.includes(tag);
                        return (
                            <Tag
                                key={tag}
                                isDelete={isDelete}
                                onToggleTag={onClickToggleTag}
                                tag={tag}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TagManagement;
