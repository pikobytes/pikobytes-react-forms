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
import { Button, Grid, Typography, } from '@mui/material';
export function FormErrorFallback(_a) {
    var error = _a.error, resetErrorBoundary = _a.resetErrorBoundary;
    return (_jsxs(Grid, __assign({ item: true, xs: 12 }, { children: [_jsx(Typography, __assign({ sx: { mb: 2 }, variant: "h4" }, { children: "Something went wrong:" })), _jsx(Typography, __assign({ align: "center", variant: "h6" }, { children: error === null || error === void 0 ? void 0 : error.message })), _jsx(Grid, __assign({ container: true, justifyContent: "flex-end" }, { children: _jsx(Grid, __assign({ item: true, xs: "auto" }, { children: _jsx(Button, __assign({ color: "primary", onClick: resetErrorBoundary, variant: "contained" }, { children: "Reset" })) })) }))] })));
}
export default FormErrorFallback;
