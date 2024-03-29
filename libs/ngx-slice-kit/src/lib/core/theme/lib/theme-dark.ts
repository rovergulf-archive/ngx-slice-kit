import { defaultColors, Theme } from '../theme.model';

export const defaultBaseRgb = `250,250,250`;
export const defaultBackgroundRgb = `48,48,48`;
export const defaultTextRgb = `26,26,26`;
export const defaultRegularRgb = `66,66,66`;

export const themeDark: Theme = {
    name: 'dark',
    base: defaultBaseRgb,
    base_text: defaultTextRgb,
    background: defaultBackgroundRgb,
    regular: defaultRegularRgb,
    regular_text: defaultBaseRgb,
    primary: defaultColors.primary,
    primary_text: defaultBaseRgb,
    success: defaultColors.success,
    success_text: defaultBaseRgb,
    accent: defaultColors.accent,
    accent_text: defaultTextRgb,
    warn: defaultColors.warn,
    warn_text: defaultBaseRgb,
};
