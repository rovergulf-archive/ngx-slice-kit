import { InjectionToken } from '@angular/core';
import { Theme } from './theme.interface';

export const THEMES = new InjectionToken('THEMES');
export const ACTIVE_THEME = new InjectionToken('ACTIVE_THEME');

export interface ThemeOptions {
  themes?: Theme[];
  active: string;
}

export const THEME_STORAGE_NAME = 'sdk_theme';
export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';
export const GREEN_THEME = 'green';
export const PURPLE_THEME = 'purple';
