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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Created by nicolas.looschen@pikobytes.de on 06/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useRef } from 'react';
import { Autocomplete, Grid, IconButton, TextField, Tooltip, } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Tag from './Tag';
import { getHighlightBackgroundColor, shouldHighlightBackground, shouldShowRequiredLabel, } from '../util';
/**
 * Component allowing to add or remove tags.
 */
export var TagManagement = function (props) {
    var inputRef = useRef(null);
    var _a = props.uiSettings, _b = _a.addButtonTooltip, addButtonTooltip = _b === void 0 ? 'Add Tag' : _b, _c = _a.component, component = _c === void 0 ? 'input' : _c, disabled = _a.disabled, label = _a.label, options = _a.options, placeholder = _a.placeholder, variant = _a.variant, required = props.validation.required, onTagCreate = props.onTagCreate, onTagRemove = props.onTagRemove, onTagRemoveReversed = props.onTagRemoveReversed, tags = props.tags, tagsToDelete = props.tagsToDelete;
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
    var handleAutocompleteSelect = function (event, value) {
        if (value !== null) {
            var tag = typeof value === 'string' ? value : value.value;
            if (onTagCreate !== undefined && !tags.includes(tag)) {
                onTagCreate(tag, { tags: tags, tagsToDelete: tagsToDelete });
            }
        }
    };
    var InputComponent = function (props) {
        var inputProps = props.inputProps, InputLabelProps = props.InputLabelProps, rest = __rest(props, ["inputProps", "InputLabelProps"]);
        var _a = inputProps !== null && inputProps !== void 0 ? inputProps : {}, ref = _a.ref, inputPropsRest = __rest(_a, ["ref"]);
        var isRequired = required !== false;
        var showRequiredLabel = shouldShowRequiredLabel(isRequired, disabled);
        var highlightBackground = shouldHighlightBackground(tags.join(''), isRequired, disabled);
        return (_jsx(TextField, __assign({ disabled: disabled, fullWidth: true, inputProps: Object.assign({}, inputPropsRest, {
                className: 'input',
                type: 'text',
                autoComplete: 'on',
                onKeyPress: onKeyPress,
            }, {
                ref: function (e) {
                    inputRef.current = e;
                    if (ref !== undefined) {
                        ref.current = e;
                    }
                },
            }), InputLabelProps: Object.assign({}, InputLabelProps, {
                shrink: true,
                required: showRequiredLabel,
            }), label: label, placeholder: placeholder, variant: variant, sx: function (theme) { return ({
                backgroundColor: getHighlightBackgroundColor(theme, highlightBackground),
            }); } }, rest), void 0));
    };
    var isAutosuggestWithoutOptions = component === 'autosuggest' &&
        (options === undefined || options.length === 0);
    if (isAutosuggestWithoutOptions) {
        console.error('No Options for TagManagement autosuggest supplied. Falling back to input.');
    }
    return (_jsxs(Grid, __assign({ container: true, spacing: 2 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsxs(Grid, __assign({ alignItems: "center", container: true, spacing: 1 }, { children: [_jsx(Grid, __assign({ item: true, xs: true }, { children: component === 'input' || isAutosuggestWithoutOptions ? (_jsx(InputComponent, {}, void 0)) : (_jsx(Autocomplete, { clearOnBlur: true, renderInput: InputComponent, onChange: handleAutocompleteSelect, options: options !== undefined ? options : [] }, void 0)) }), void 0), component === 'input' && (_jsx(Grid, __assign({ item: true, xs: "auto" }, { children: _jsx(Tooltip, __assign({ title: addButtonTooltip }, { children: _jsx(IconButton, __assign({ className: "button", onClick: onClickAdd }, { children: _jsx(AddIcon, {}, void 0) }), void 0) }), void 0) }), void 0))] }), void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(Grid, __assign({ container: true, spacing: 1 }, { children: tags.map(function (tag) {
                        var isDelete = tagsToDelete === undefined || tagsToDelete.length === 0
                            ? false
                            : tagsToDelete.includes(tag);
                        return (_jsx(Tag, { isDelete: isDelete, onToggleTag: onClickToggleTag, tag: tag }, tag));
                    }) }), void 0) }), void 0)] }), void 0));
};
export default TagManagement;
