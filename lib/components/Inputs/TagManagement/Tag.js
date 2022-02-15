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
 * Created by nicolas.looschen@pikobytes.de on 16/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { Card, Grid, IconButton, useTheme, Typography } from '@mui/material';
export function Tag(props) {
    var isDelete = props.isDelete, onToggleTag = props.onToggleTag, tag = props.tag;
    var onClick = function (event) {
        onToggleTag(tag, event);
    };
    var theme = useTheme();
    return (_jsx(Grid, __assign({ item: true, xs: "auto" }, { children: _jsx(Card, __assign({ sx: function (theme) { return ({
                backgroundColor: isDelete ? theme.palette.grey["100"] : theme.palette.grey["A100"],
                colors: isDelete ? theme.palette.text.disabled : theme.palette.text.primary,
                padding: 1,
                textDecoration: isDelete ? "line-through" : "none"
            }); } }, { children: _jsxs(Grid, __assign({ alignItems: "center", container: true, justifyContent: "flex-end", spacing: 2 }, { children: [_jsx(Grid, __assign({ item: true, xs: "auto", sx: { maxWidth: "100%", lineBreak: "anywhere" } }, { children: _jsx(Typography, { children: tag }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, style: { padding: "".concat(theme.spacing(1), "px 0") }, xs: "auto" }, { children: _jsx(IconButton, __assign({ onClick: onClick, sx: { padding: 0.5 } }, { children: _jsx(CancelIcon, { sx: function (theme) { return ({
                                    height: theme.spacing(2),
                                    width: theme.spacing(2),
                                    maxWidth: theme.spacing(2),
                                    minWidth: theme.spacing(2),
                                }); } }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0) }), void 0));
}
export default React.memo(Tag);
