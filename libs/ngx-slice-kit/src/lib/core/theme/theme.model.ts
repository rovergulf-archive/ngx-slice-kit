const defaultBaseRgb = `25, 25, 25`;
const defaultBackgroundRgb = `255, 255, 255`;
const defaultRegularRgb = `66, 66, 66`;
const defaultPrimaryRgb = `0, 85, 255`; // `0, 85, 255`;
const defaultSuccessRgb = `39, 174, 96`; // `39, 174, 96`;
const defaultAccentRgb = `241, 201, 79`; // `255, 168, 38`;
const defaultWarnRgb = `211, 50, 39`; // `238, 112, 112`;

export const defaultColors = {
    base: defaultBaseRgb,
    background: defaultBackgroundRgb,
    regular: defaultRegularRgb,
    primary: defaultPrimaryRgb,
    primaryText: defaultBackgroundRgb,
    success: defaultSuccessRgb,
    successText: defaultBackgroundRgb,
    accent: defaultAccentRgb,
    accentText: defaultBackgroundRgb,
    warn: defaultWarnRgb,
    warnText: defaultBackgroundRgb,
};

export const baseColors = [
    `base`, `background`,
];

export const rgbDepth = `rgb`;

export const colors = [
    `regular`, `primary`, `success`, `accent`, `warn`,
];

export const emptyDepth = ``;

class Depth {
    color: string;
    alpha: number = 1;
    background?: string;
}

export const colorsDepth = {
    rgb: {alpha: 75},
    deep: {alpha: 100},
    hover: {alpha: 90},
    active: {alpha: 60},
    disabled: {alpha: 45},
    smooth: {alpha: 10},
};

export const textDepth = {
    placeholder: {color: 'background', alpha: 30, background: 'background'},
    text: {color: 'background', alpha: 80, background: 'background'},
};

const alphaLimit = 100;
const alphaStep = 5;

export class ColorProperty {
    value?: string;
    background?: string;
    name?: string;
    prop?: string;
    alpha?: number = alphaLimit;
    rgb?: string;
    rgba?: string;
    hex?: string;

    constructor(cp?: ColorProperty) {
        Object.assign(this, cp);

        if (this.name.indexOf('-') > 0) {
            this.prop = `--${this.name}`;
        } else if (this.name.indexOf('-') === 0) {
            this.prop = this.name;
        } else {
            this.prop = `--${this.name}-a${this.alpha}`;
        }

        this.hex = rgbaToHex(this.rgba);
        if (this.value) {
            const alpha = this.alpha / alphaLimit;
            const rgbaVal = `${this.value}, ${alpha}`;

            this.rgba = `rgba(${rgbaVal})`;
            this.rgb = `rgb(${this.value})`;
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

            for (let ind = 0; ind <= alphaLimit; ind += alphaStep) {
                results.push(new ColorProperty({
                    name: color,
                    value: rgb,
                    alpha: ind,
                }));
            }

            if (colors.indexOf(color) >= 0) {
                results.push(...this.objectToColorProperties(colorsDepth, color));
                results.push(...this.objectToColorProperties(textDepth, color));
            }
        }

        return results;
    }

    private objectToColorProperties?(srcObj: any, color: string): ColorProperty[] {
        const results: ColorProperty[] = [];

        for (const key of Object.keys(srcObj)) {
            if (srcObj.hasOwnProperty(key)) {
                const depth = srcObj[key];
                const value = this[color];

                const prop: ColorProperty = {
                    name: `${color}-${key}`,
                    alpha: depth.alpha,
                    value,
                };

                results.push(new ColorProperty(prop));
            }
        }

        return results;
    }

}

export const rgbaToHex = (rgba: string): string => {
    if (!rgba) {
        return '#fff';
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

const toNumArray = (str: string): number[] => {
    const separator = sep(str);
    return str?.split(separator).map((rgb, i) => {
        if (i === 0) {
            return parseInt(rgb.substring(5, rgb.length), 10);
        } else {
            return parseInt(rgb, 10);
        }
    });
};

const sep = (str: string): string => {
    return str.indexOf(',') < 0 ? (str.indexOf(', ') < 0 ? ' ' : ', ') : ',';
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
