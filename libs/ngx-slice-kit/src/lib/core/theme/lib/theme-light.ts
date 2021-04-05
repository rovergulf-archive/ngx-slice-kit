import { defaultColors, Theme } from '../theme.model';

export const themeLight: Theme = {
    name: 'light',
    base: defaultColors.base,
    base_text: defaultColors.background,
    background: defaultColors.background,
    regular: defaultColors.regular,
    regular_text: defaultColors.base,
    primary: defaultColors.primary,
    primary_text: defaultColors.background,
    success: defaultColors.success,
    success_text: defaultColors.background,
    accent: defaultColors.accent,
    accent_text: defaultColors.base,
    warn: defaultColors.warn,
    warn_text: defaultColors.background
};
