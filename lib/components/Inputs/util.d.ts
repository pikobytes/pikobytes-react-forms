import { Theme } from '@mui/material';
/**
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
export declare const shouldHighlightBackground: (value: string, required?: boolean, disabled?: boolean) => boolean | undefined;
export declare const shouldShowRequiredLabel: (required?: boolean, disabled?: boolean) => boolean | undefined;
export declare const getHighlightBackgroundColor: (theme: Theme, highlightBackground?: boolean) => string;
