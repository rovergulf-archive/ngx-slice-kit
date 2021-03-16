import { Theme } from '../theme.model';

export const themeLight: Theme = {
    name: 'light',
    properties: {
        /**
         * Theme tones
         */
        '--base-rgb': '255,255,255',
        '--opposite-rgb': '26,26,26',
        '--background': 'rgb(var(--base-rgb))',
        /**
         * Regular color
         */
        '--regular-rgb': '95,95,95',
        '--regular-deep': 'rgb(66,66,66)',
        '--regular': 'rgb(95,95,95)', // rgba(26, 26, 26, 0.70)
        '--regular-hover': 'rgb(163, 163, 163)', // rgba(26, 26, 26, 0.40)
        '--regular-active': 'rgb(200, 200, 200)', // rgba(26, 26, 26, 0.24)
        '--regular-disabled': 'rgb(233, 233, 233)', // rgba(26, 26, 26, 0.1)
        '--regular-smooth': 'rgb(246, 246, 246)', // rgba(26, 26, 26, 0.1)
        '--regular-placeholder': 'rgb(163, 163, 163)',
        '--regular-text': 'rgb(var(--opposite-rgb))',
        '--regular-text-reverse': 'rgb(var(--base-rgb))',
        /**
         * Primary color
         */
        '--primary-rgb': '0,85,255',
        '--primary': 'rgb(var(--primary-rgb))', // rgb(0, 85, 255) / #0055FF
        '--primary-deep': 'rgb(54, 79, 232)',
        '--primary-hover': 'rgb(38, 110, 254)',
        '--primary-active': 'rgb(75, 135, 254)',
        '--primary-disabled': 'rgb(125, 167, 253)',
        '--primary-text': 'rgb(var(--base-rgb))',
        /**
         * Support colors
         */
        // success
        '--success-rgb': '39, 174, 96',
        '--success': 'rgb(var(--success-rgb))', // rgb(39, 174, 96) / #27AE60
        '--success-hover': 'rgb(71, 186, 120)',
        '--success-active': 'rgb(104, 199, 144)',
        '--success-disabled': 'rgb(147, 215, 176)',
        '--success-text': 'rgb( var(--base-rgb))',
        // accent
        '--accent-rgb': '255,153,0',
        '--accent': 'rgb(var(--accent-rgb))', // rgb(253, 153, 0) / #FF9900
        '--accent-hover': 'rgb(255, 168, 38)',
        '--accent-active': 'rgb(255, 184, 77)',
        '--accent-disabled': 'rgb(255, 204, 128)',
        '--accent-text': 'rgb(var(--base-rgb))',
        // warn
        '--warn-rgb': '235, 87, 87',
        '--warn': 'rgb(var(--warn-rgb))', // rgba(235, 87, 87, 1) / #EB5757
        '--warn-hover': 'rgb(238, 112, 112)',
        '--warn-active': 'rgb(241, 138, 138)',
        '--warn-disabled': 'rgb(245, 171, 171)',
        '--warn-text': 'rgb(var(--base-rgb))',
        /**
         * those defaults needed to correct contrast a11y
         */
        background: 'var(--background)',
        color: 'var(--regular-text)',
    }
};


