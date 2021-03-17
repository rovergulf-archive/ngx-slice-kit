import { defaultColors, Theme } from '../theme.model';

export const defaultBaseRgb = `255, 255, 255`;
export const defaultBackgroundRgb = `26, 26, 26`;
export const defaultRegularRgb = `66, 66, 66`;

export const themeDark: Theme = {
    name: 'dark',
    base: defaultBaseRgb,
    background: defaultBackgroundRgb,
    regular: defaultRegularRgb,
    regular_text: defaultRegularRgb,
    primary: defaultColors.primary,
    primary_text: defaultBaseRgb,
    success: defaultColors.success,
    success_text: defaultBaseRgb,
    accent: defaultColors.accent,
    accent_text: defaultBaseRgb,
    warn: defaultColors.warn,
    warn_text: defaultBaseRgb,
};

