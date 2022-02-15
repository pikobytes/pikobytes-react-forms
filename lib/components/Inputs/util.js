import { alpha } from '@mui/material';
/**
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
export var shouldHighlightBackground = function (value, required, disabled) {
    return value === '' && required && !disabled;
};
export var shouldShowRequiredLabel = function (required, disabled) {
    return required && !disabled;
};
export var getHighlightBackgroundColor = function (theme, highlightBackground) {
    return highlightBackground
        ? alpha(theme.palette.error.light, 0.35)
        : theme.palette.background.default;
};
