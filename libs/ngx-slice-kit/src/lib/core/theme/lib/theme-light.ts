import { defaultColors, Theme } from '../theme.model';
import { defaultBackgroundRgb } from './theme-dark';

export const themeLight: Theme = {
    name: 'light',
    base: defaultColors.base,
    background: defaultColors.background,
    regular: defaultColors.regular,
    regular_text: defaultBackgroundRgb,
    primary: defaultColors.primary,
    primary_text: defaultBackgroundRgb,
    success: defaultColors.success,
    success_text: defaultBackgroundRgb,
    accent: defaultColors.accent,
    accent_text: defaultBackgroundRgb,
    warn: defaultColors.warn,
    warn_text: defaultBackgroundRgb,
};


