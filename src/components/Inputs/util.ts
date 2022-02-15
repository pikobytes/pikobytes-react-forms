import { alpha, Theme } from '@mui/material';

/**
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export const shouldHighlightBackground = (
  value: string,
  required?: boolean,
  disabled?: boolean
) => {
  return value === '' && required && !disabled;
};

export const shouldShowRequiredLabel = (
  required?: boolean,
  disabled?: boolean
) => {
  return required && !disabled;
};

export const getHighlightBackgroundColor = (
  theme: Theme,
  highlightBackground?: boolean
) => {
  return highlightBackground
    ? alpha(theme.palette.error.light, 0.35)
    : theme.palette.background.default;
};
