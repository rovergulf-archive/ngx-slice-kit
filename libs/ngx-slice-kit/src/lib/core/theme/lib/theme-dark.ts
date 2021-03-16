import { defaultColors, Theme } from '../theme.model';

export const defaultBaseRgb = `26, 26, 26`;
export const defaultOppositeRgb = `255, 255, 255`;
export const defaultRegularRgb = `186, 186, 186`;

export const themeDark: Theme = {
    name: 'dark',
    baseRgb: defaultBaseRgb,
    oppositeRgb: defaultOppositeRgb,
    regularRgb: defaultRegularRgb,
    primaryRgb: defaultColors.primary,
    successRgb: defaultColors.success,
    accentRgb: defaultColors.accent,
    warnRgb: defaultColors.warn,
};

