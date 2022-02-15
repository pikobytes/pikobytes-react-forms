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
import { jsx as _jsx } from "react/jsx-runtime";
import { useController } from 'react-hook-form';
import TagManagement from './TagManagement';
import { isFieldSet } from '../../../util/fieldAccess';
export function TagManagementContainer(props) {
    var customProperties = props.customProperties, fieldId = props.fieldId, validation = props.validation;
    var isEdit = (customProperties !== null && customProperties !== void 0 ? customProperties : {}).isEdit;
    var field = useController({ name: fieldId, rules: validation }).field;
    var value = field.value, onChange = field.onChange;
    var onTagCreate = function (tag, tagObject) {
        tagObject.tags.push(tag);
        onChange(JSON.stringify(tagObject));
    };
    var onTagRemove = function (tagToDelete, tagObject) {
        if (isEdit) {
            tagObject.tagsToDelete.push(tagToDelete);
        }
        else {
            tagObject.tags = tagObject.tags.filter(function (tag) { return tag !== tagToDelete; });
        }
        onChange(JSON.stringify(tagObject));
    };
    var onTagRemoveAbort = function (tag, tagObject) {
        var newTagsToDelete = tagObject.tagsToDelete.filter(function (t) { return t !== tag; });
        tagObject.tagsToDelete =
            newTagsToDelete.length === 0 ? [] : newTagsToDelete;
        onChange(JSON.stringify(tagObject));
    };
    var _a = isFieldSet(value)
        ? JSON.parse(value)
        : { tags: [], tagsToDelete: [] }, tags = _a.tags, tagsToDelete = _a.tagsToDelete;
    return (_jsx(TagManagement, __assign({ onTagCreate: onTagCreate, onTagRemove: onTagRemove, onTagRemoveReversed: onTagRemoveAbort, tags: tags, tagsToDelete: tagsToDelete }, props), void 0));
}
export default TagManagementContainer;
