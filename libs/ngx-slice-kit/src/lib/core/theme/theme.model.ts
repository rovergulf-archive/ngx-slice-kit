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
    base_text: defaultBackgroundRgb,
    background: defaultBackgroundRgb,
    regular: defaultRegularRgb,
    regular_text: defaultBaseRgb,
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
    public value: string;
    public text_value?: string;
    public background: string;
    public name: string;
    public text?: string;
    public prop?: string;
    public alpha?: number;
    public rgb?: string;
    public hex?: string;

    constructor(cp?: ColorProperty) {
        Object.assign(this, cp);
        this.prop = `--${this.name}`;

        // find color values
        const rgbVal = this.value.split(sep(this.value)).map(i => parseInt(i, 10));
        const bgVal = this.background.split(sep(this.background)).map(i => parseInt(i, 10));
        const rgbMixin = MixinRgba(rgbVal, bgVal, this.alpha / 100);
        const bgMixin = MixinRgba(bgVal, rgbVal, this.alpha / 100);

        // declare rgb values
        this.rgb = NumArrayToRgbString(rgbMixin);
        this.hex = RgbaToHex(this.rgb);
        this.background = NumArrayToRgbString(bgMixin);

        // check if text value is available
        if (this.text_value?.length > 0) {
            const textVal = this.text_value.split(sep(this.text_value)).map(i => parseInt(i, 10));
            const textMixin = MixinRgba(textVal, bgVal, 0.9);
            this.text = NumArrayToRgbString(textMixin);
        }
    }
}

export class Theme {
    public name: string;

    // there goes RGB colors palette string values
    public base?: string;
    public background?: string;
    public regular?: string;
    public primary?: string;
    public success?: string;
    public accent?: string;
    public warn?: string;
    // text keys
    public base_text?: string;
    public regular_text?: string;
    public primary_text?: string;
    public success_text?: string;
    public accent_text?: string;
    public warn_text?: string;

    public colors?: Set<ColorProperty>;

    constructor(t?: Theme) {
        Object.assign(this, defaultColors, t);

        this.colors = new Set<ColorProperty>();
        for (const color of [...baseColors, ...colors]) {
            const rgb = this[color];

            const textColor = `${color}_text`;
            const colorProp = new ColorProperty({
                name: color,
                text_value: this[textColor],
                alpha: alphaLimit,
                value: rgb,
                background: rgb === this.background ? this.base : this.background,
            });
            this.colors.add(colorProp);
        }
    }

    public props?(): ColorProperty[] {
        const results = [];

        for (const c of this.colors) {
            results.push(c);
        }

        for (const color of [...baseColors, ...colors]) {
            const rgb = this[color];

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

export const MixinRgba = (base: number[], added: number[], alpha: number): number[] => {
    const r3 = Math.round(((1 - alpha) * added[0]) + (alpha * base[0]));
    const g3 = Math.round(((1 - alpha) * added[1]) + (alpha * base[1]));
    const b3 = Math.round(((1 - alpha) * added[2]) + (alpha * base[2]));
    return [r3, g3, b3];
};

export const NumArrayToRgbString = (rgb: number[]): string => {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
};

export const RgbaToHex = (rgba: string): string => {
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

export const HexToRgb = (hex: string): number[] => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return [r, g, b];
};
