var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useRef } from 'react';
import { Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Tag from './Tag';
/**
 * Component allowing to add or remove tags.
 */
export var TagManagement = function (props) {
    var inputRef = useRef(null);
    var _a = props.uiSettings, _b = _a.addButtonTooltip, addButtonTooltip = _b === void 0 ? "Add Tag" : _b, disabled = _a.disabled, label = _a.label, placeholder = _a.placeholder, variant = _a.variant, required = props.validation.required, onTagCreate = props.onTagCreate, onTagRemove = props.onTagRemove, onTagRemoveReversed = props.onTagRemoveReversed, tags = props.tags, tagsToDelete = props.tagsToDelete;
    /**
     * Signals that we create a new tag
     * @param {string} tag
     */
    var createTag = function (tag) {
        if (onTagCreate !== undefined && !tags.includes(tag)) {
            onTagCreate(tag, { tags: tags, tagsToDelete: tagsToDelete });
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
    var removeTag = function (tag) {
        if (onTagRemove !== undefined) {
            onTagRemove(tag, {
                tags: tags,
                tagsToDelete: tagsToDelete === undefined ? [] : tagsToDelete,
            });
        }
    };
    /**
     * On click it adds a tag to the tags container
     */
    var onClickAdd = function () {
        // it is not allowed to add empty values
        if (inputRef.current !== null && inputRef.current.value.length > 0) {
            createTag(inputRef === null || inputRef === void 0 ? void 0 : inputRef.current.value);
        }
    };
    /**
     * EventListener for a onKeyPress event. This allows us to catch enter events.
     * @param {string} tag - which was clicked
     * @param {*} event
     */
    var onClickToggleTag = function (tag, event) {
        // prevent the default behavior because this could lead to unwanted side effects
        // on parent components
        event.preventDefault();
        event.stopPropagation();
        if (tagsToDelete !== undefined && tagsToDelete.includes(tag)) {
            onTagRemoveReversed(tag, { tags: tags, tagsToDelete: tagsToDelete });
        }
        else {
            removeTag(tag);
        }
    };
    /**
     * EventListener for a onKeyPress event. This allows us to catch enter events.
     * @param {*} event
     */
    var onKeyPress = function (event) {
        if (event.key === 'Enter') {
            // prevent the default behavior because this could lead to unwanted side effects
            // on parent components
            event.preventDefault();
            event.stopPropagation();
            onClickAdd();
        }
    };
    return (_jsxs(Grid, __assign({ container: true, spacing: 2 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsxs(Grid, __assign({ alignItems: "center", container: true, spacing: 1 }, { children: [_jsx(Grid, __assign({ item: true, xs: true }, { children: _jsx(TextField, { disabled: disabled, fullWidth: true, inputProps: {
                                    className: 'input',
                                    type: 'text',
                                    autoComplete: 'on',
                                    ref: inputRef,
                                    onKeyPress: onKeyPress,
                                }, InputLabelProps: { shrink: true, required: required !== false }, label: label, placeholder: placeholder, variant: variant }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: "auto" }, { children: _jsx(Tooltip, __assign({ title: addButtonTooltip }, { children: _jsx(IconButton, __assign({ className: "button", onClick: onClickAdd }, { children: _jsx(AddIcon, {}, void 0) }), void 0) }), void 0) }), void 0)] }), void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(Grid, __assign({ container: true, spacing: 1 }, { children: tags.map(function (tag) {
                        var isDelete = tagsToDelete === undefined || tagsToDelete.length === 0
                            ? false
                            : tagsToDelete.includes(tag);
                        return (_jsx(Tag, { isDelete: isDelete, onToggleTag: onClickToggleTag, tag: tag }, tag));
                    }) }), void 0) }), void 0)] }), void 0));
};
export default TagManagement;
