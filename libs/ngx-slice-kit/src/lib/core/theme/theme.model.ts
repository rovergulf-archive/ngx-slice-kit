const defaultBaseRgb = `25,25,25`;
const defaultBackgroundRgb = `255,255,255`;
const defaultRegularRgb = `186,186,186`; // `66,66,66`;
const defaultPrimaryRgb = `0,85,255`; // `0,85,255`;
const defaultSuccessRgb = `39,174,96`; // `39,174,96`;
const defaultAccentRgb = `241,201,79`; // `255,168,38`;
const defaultWarnRgb = `211,50,39`; // `238,112,112`;

export type ThemeBaseColors = 'base' | 'background';
export type ThemeColors = 'regular' | 'primary' | 'success' | 'accent' | 'warn';

export const defaultColors = {
    base: defaultBaseRgb,
    background: defaultBackgroundRgb,
    regular: defaultRegularRgb,
    primary: defaultPrimaryRgb,
    primary_text: defaultBackgroundRgb,
    success: defaultSuccessRgb,
    success_text: defaultBackgroundRgb,
    accent: defaultAccentRgb,
    accent_text: defaultBackgroundRgb,
    warn: defaultWarnRgb,
    warn_text: defaultBackgroundRgb,
};

export const baseColors = [
    `base`, `background`,
];

export const colors = [
    `regular`, `primary`, `success`, `accent`, `warn`,
];

const alphaLimit = 100;
const alphaStep = 10;

export class ColorProperty {
    value: string;
    text_value?: string;
    background: string;
    name: string;
    text?: string;
    prop?: string;
    alpha?: number;
    rgb?: string;
    hex?: string;

    constructor(cp?: ColorProperty) {
        Object.assign(this, cp);
        this.prop = `--${this.name}`;

        // find color values
        const rgbVal = this.value.split(sep(this.value)).map(i => parseInt(i, 10));
        const bgVal = this.background.split(sep(this.background)).map(i => parseInt(i, 10));
        const rgbMixin = mixinRgba(rgbVal, bgVal, this.alpha / 100);
        const bgMixin = mixinRgba(bgVal, rgbVal, this.alpha / 100);

        // declare rgb values
        this.rgb = numArrayToRgbString(rgbMixin);
        this.hex = rgbaToHex(this.rgb);
        this.background = numArrayToRgbString(bgMixin);

        // check if text value is available
        if (this.text_value?.length > 0) {
            const textVal = this.text_value.split(sep(this.text_value)).map(i => parseInt(i, 10));
            const textMixin = mixinRgba(textVal, bgVal, 0.9);
            this.text = numArrayToRgbString(textMixin);
        }
    }
}

export class Theme {
    name: string;

    // there goes RGB colors palette string values
    base?: string;
    background?: string;
    regular?: string;
    primary?: string;
    success?: string;
    accent?: string;
    warn?: string;
    // text keys
    base_text?: string;
    regular_text?: string;
    primary_text?: string;
    success_text?: string;
    accent_text?: string;
    warn_text?: string;

    constructor(t?: Theme) {
        Object.assign(this, defaultColors, t);
    }

    public props?(): ColorProperty[] {
        const results = [];

        for (const color of [...baseColors, ...colors]) {
            const rgb = this[color];

            const textColor = `${color}_text`;
            const colorProp = {
                name: color,
                text_value: this[textColor],
                alpha: 100,
                value: rgb,
                background: rgb === this.background ? this.base : this.background,
            };
            results.push(new ColorProperty(colorProp));

            for (let alpha = alphaStep; alpha <= alphaLimit; alpha += alphaStep) {
                results.push(new ColorProperty({
                    name: `${color}-a${alpha}`,
                    alpha,
                    value: rgb,
                    background: rgb === this.background ? this.base : this.background,
                }));
            }
        }

        return results;
    }
}

const sep = (str: string): string => {
    return str?.indexOf(',') < 0 ? (str?.indexOf(', ') < 0 ? ' ' : ', ') : ',';
};

const trim = (str: string): string => {
    return str?.replace(/^\s+|\s+$/gm, '');
};

export const mixinRgba = (base: number[], added: number[], alpha: number): number[] => {
    const r3 = Math.round(((1 - alpha) * added[0]) + (alpha * base[0]));
    const g3 = Math.round(((1 - alpha) * added[1]) + (alpha * base[1]));
    const b3 = Math.round(((1 - alpha) * added[2]) + (alpha * base[2]));
    return [r3, g3, b3];
};

export const numArrayToRgbString = (rgb: number[]): string => {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
};

export const rgbaToHex = (rgba: string): string => {
    if (!rgba) {
        return '';
    }

    const inParts = rgba.substring(rgba.indexOf('(')).split(sep(rgba));
    const r = parseInt(trim(inParts[0].substring(1)), 10);
    const g = parseInt(trim(inParts[1]), 10);
    const b = parseInt(trim(inParts[2]), 10);
    const outParts = [
        r.toString(16),
        g.toString(16),
        b.toString(16)
    ];

    if (inParts.length > 3) {
        const a: any = parseFloat(trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(2);
        outParts.push(Math.round(a * 255).toString(16).substring(0, 2));
    }

    // Pad single-digit output values
    outParts.forEach((part, i) => {
        if (part.length === 1) {
            outParts[i] = '0' + part;
        }
    });

    return ('#' + outParts.join(''));
};

