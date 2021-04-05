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

// export const textColors = [
//     'primary_text', 'success_text', 'accent_text', 'warn_text',
// ];

export const rgbDepth = `rgb`;
export const emptyDepth = ``;

class Depth {
    color: string;
    alpha: number = 1;
    background?: string;
}

export const colorsDepth = {
    rgb: {alpha: 100},
    deep: {alpha: 90},
    hover: {alpha: 75},
    active: {alpha: 60},
    disabled: {alpha: 45},
    smooth: {alpha: 10},
};

export const textDepth = {
    placeholder: {color: 'background', alpha: 75, background: 'base'},
    text: {color: 'background', alpha: 5, background: 'base'},
};

const alphaLimit = 100;
const alphaStep = 10;

export class ColorProperty {
    value: string;
    background: string;
    name: string;
    prop?: string;
    alpha?: number;
    rgb?: string;
    hex?: string;

    constructor(cp?: ColorProperty) {
        Object.assign(this, cp);

        this.prop = `--${this.name}`;
        const rgbVal = this.value.split(sep(this.value)).map(i => parseInt(i, 10));
        const bgVal = this.background.split(sep(this.background)).map(i => parseInt(i, 10));
        this.rgb = rgbaToRgb(rgbVal[0], rgbVal[1], rgbVal[2], this.alpha / 100, bgVal[0], bgVal[1], bgVal[2]);
        this.hex = rgbaToHex(this.rgb);
        this.background = rgbaToRgb(bgVal[0], bgVal[1], bgVal[2], this.alpha / 100, rgbVal[0], rgbVal[1], rgbVal[2]);

        // if (this.alpha % 40 === 0) {
        //     console.log(this);
        // }
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

            const colorProp = {
                name: color,
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

const sep = (str: string): string => {
    return str?.indexOf(',') < 0 ? (str?.indexOf(', ') < 0 ? ' ' : ', ') : ',';
};

const trim = (str: string): string => {
    return str?.replace(/^\s+|\s+$/gm, '');
};

export const mixinRgba = (base: number[], added: number[]): string => {
    const mix = [];

    mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
    mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3])); // red
    mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3])); // green
    mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3])); // blue

    return `rgba(${base.join(',')})`;
};

export const rgbaToRgb = (r, g, b, a, r2, g2, b2: number): string => {
    const r3 = Math.round(((1 - a) * r2) + (a * r));
    const g3 = Math.round(((1 - a) * g2) + (a * g));
    const b3 = Math.round(((1 - a) * b2) + (a * b));
    return `rgb(${r3},${g3},${b3})`;
};
