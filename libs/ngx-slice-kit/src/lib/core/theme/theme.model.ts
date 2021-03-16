const defaultBaseRgb = `26, 26, 26`;
const defaultOppositeRgb = `255, 255, 255`;
const defaultRegularRgb = `95, 95, 95`;
const defaultPrimaryRgb = `0, 85, 255`;
const defaultSuccessRgb = `39, 174, 96`;
const defaultAccentRgb = `255, 168, 38`;
const defaultWarnRgb = `238, 112, 112`;

export const defaultColors = {
    base: defaultBaseRgb,
    opposite: defaultOppositeRgb,
    regular: defaultRegularRgb,
    primary: defaultPrimaryRgb,
    success: defaultSuccessRgb,
    accent: defaultAccentRgb,
    warn: defaultWarnRgb,
};

export const baseColors = [
    `base`, `opposite`,
];

export const rgbDepth = `rgb`;

export const colors = [
    ...baseColors, `regular`, `primary`, `success`, `accent`, `warn`,
];

export const emptyDepth = ``;

class Depth {
    color: string;
    alpha: number = 1;
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
    placeholder: {color: 'opposite', alpha: 1},
    text: {color: 'base', alpha: 1},
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
    mixin?: string;

    constructor(cp?: ColorProperty) {
        Object.assign(this, cp);

        if (this.name.indexOf('-') > 0) {
            this.prop = `--${this.name}`;
        } else {
            this.prop = `--${this.name}-a${this.alpha}`;
        }

        this.hex = rgbaToHex(this.rgba);
        if (this.value) {
            this.rgb = `rgb(${this.value})`;
            this.rgba = `rgba(${this.value}, ${this.alpha / alphaLimit})`;

            const rgba = this.rgba?.split(sep(this.rgba)).map((rgb, i) => {
                if (i === 0) {
                    return parseInt(rgb.substring(5, rgb.length), 10);
                } else {
                    return parseInt(rgb, 10);
                }
            });
            if (rgba.length > 2) {
                this.mixin = mixinRgba([...rgba, 1], [rgba[0], rgba[1], rgba[2], this.alpha]);
            }
        }

        // if (this.alpha === 50 || this.alpha === 35 || this.alpha === 95) {
        //     console.log(this);
        // }
    }
}

export class Theme {
    name: string;

    // there goes RGB colors palette string values
    baseRgb?: string;
    oppositeRgb?: string;
    regularRgb?: string;
    primaryRgb?: string;
    successRgb?: string;
    accentRgb?: string;
    warnRgb?: string;

    constructor(t?: Theme) {
        Object.assign(this, t);

        if (this.baseRgb === '') {
            this.baseRgb = defaultColors.base;
        }

        if (this.oppositeRgb === '') {
            this.oppositeRgb = defaultColors.opposite;
        }

        if (this.regularRgb === '') {
            this.regularRgb = defaultColors.regular;
        }

        if (this.primaryRgb === '') {
            this.primaryRgb = defaultColors.primary;
        }

        if (this.successRgb === '') {
            this.successRgb = defaultColors.success;
        }

        if (this.accentRgb === '') {
            this.accentRgb = defaultColors.accent;
        }

        if (this.warnRgb === '') {
            this.warnRgb = defaultColors.warn;
        }
    }

    public props?(): ColorProperty[] {
        const results = [];

        for (const color of colors) {
            const cKey = `${color}Rgb`;
            const rgb = this[cKey];

            for (let ind = alphaStep; ind <= alphaLimit; ind += alphaStep) {
                results.push(new ColorProperty({
                    name: color,
                    value: rgb,
                    alpha: ind,
                }));
            }

            if (colors.indexOf(color) > 1) {
                results.push(...this.objectToColorProperties(colorsDepth, color));
            }
        }

        results.push({
            name: '--background',
            value: 'rgb(var(--opposite-deep))',
            rgb: 'rgb(var(--opposite-deep))',
            rgba: 'rgb(var(--opposite-deep))'
        }, {
            name: '--color',
            value: 'var(--regular-deep)',
            rgb: 'rgb(var(--regular-deep))',
            rgba: 'rgb(var(--regular-deep))'
        });

        return results;
    }

    private objectToColorProperties?(srcObj: any, colorName?: string, background?: string): ColorProperty[] {
        const results: ColorProperty[] = [];

        for (const key of Object.keys(srcObj)) {
            if (srcObj.hasOwnProperty(key)) {
                const {alpha, color = colorName} = srcObj[key];
                const value = this[`${color}Rgb`];

                const prop: ColorProperty = new ColorProperty({
                    name: `${color}-${key}`,
                    alpha,
                    value,
                });

                results.push(prop as ColorProperty);
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

const sep = (str: string): string => {
    return str.indexOf(',') > -1 ? (str.indexOf(', ') > -1 ? ' ' : ', ') : ',';
};

const trim = (str: string): string => {
    return str?.replace(/^\s+|\s+$/gm, '');
};

export const mixinRgba = (base: number[], added: number[]): string => {
    const mix = [];
    if (!added.length) {
        const opposite = defaultColors.opposite;
        const result = [...opposite.split(sep(opposite)).map(a => parseInt(a, 10))];
        if (result.length === 3) {
            result.push(1);
        }
    }

    mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
    mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3])); // red
    mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3])); // green
    mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3])); // blue

    return `rgba(${base.join(',')})`;
};
