export const defaultBaseRgb = `26, 26, 26`;
export const defaultOppositeRgb = `255, 255, 255`;
export const defaultRegularRgb = `95, 95, 95`;
export const defaultPrimaryRgb = `0, 85, 255`;
export const defaultSuccessRgb = `39, 174, 96`;
export const defaultAccentRgb = `255, 168, 38`;
export const defaultWarnRgb = `238, 112, 112`;

export const defaultColors = {
    base: defaultBaseRgb,
    opposite: defaultOppositeRgb,
    regular: defaultRegularRgb,
    primary: defaultPrimaryRgb,
    success: defaultSuccessRgb,
    accent: defaultAccentRgb,
    warn: defaultWarnRgb,
};

export const colors = [
    `base`, `opposite`, `regular`, `primary`, `success`, `accent`, `warn`
];

export const emptyDepth = ``;
export const rgbDepth = `rgb`;

export const colorsDepth = {
    a75: 'rgb',
    a100: 'deep',
    a90: 'hover',
    a60: 'active',
    a45: 'disabled',
    a10: 'smooth',
};

export const textDepth = {
    'a-45': 'text-placeholder',
    'a-80': 'text',
};

const alphaLimit = 100;
const alphaStep = 5;

export class ColorProperty {
    value?: string;
    background?: string = `255, 255, 255`;
    name?: string;
    alpha?: number = 1;
    rgb?: string;
    rgba?: string;
    hex?: string;
    mixin?: string;

    constructor(cp?: ColorProperty) {
        Object.assign(this, cp);

        this.hex = rgbaToHex(this.rgba);
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
            results.push({
                name: `--${color}-rgb`,
                value: rgb
            });

            for (let ind = 0; ind <= alphaLimit; ind += alphaStep) {
                const value = `${rgb}, ${ind / alphaLimit}`;
                results.push({
                    name: `--${color}-a${ind}`,
                    value,
                    rgb: `rgb(${rgb})`,
                    rgba: `rgba(${rgb}, ${ind / alphaLimit})`,
                });
            }

            if (colors.indexOf(color) > 1) {
                results.push(...this.objectToColorProperties(colorsDepth, color));
                results.push(...this.objectToColorProperties(textDepth, color));
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

    public levels?(color: string): ColorProperty[] {
        return [...this.objectToColorProperties(colorsDepth, color), ...this.objectToColorProperties(textDepth, color)];
    }

    private objectToColorProperties?(srcObj: any, color: string, background?: string): ColorProperty[] {
        const results: ColorProperty[] = [];

        for (const key of Object.keys(srcObj)) {
            if (srcObj.hasOwnProperty(key)) {
                const keyName = srcObj[key];
                const prefix = key.substring(0, 1);
                const alpha = parseInt(key.substring(1), 10) / 100;
                const varName = prefix === 'a' ? 'opposite' : color;
                const value = this[`${varName}Rgb`];

                const rgbValue = `rgb(${value})`;
                const prop: ColorProperty = new ColorProperty({
                    name: `--${color}-${keyName}`,
                    rgb: rgbValue,
                    rgba: `rgba(${value}, ${alpha < 0 ? -alpha : alpha})`,
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

    const sep = rgba.indexOf(',') > -1 ? (rgba.indexOf(', ') > -1 ? ' ' : ', ') : ',';
    const inParts = rgba.substring(rgba.indexOf('(')).split(sep);
    const r = parseInt(trim(inParts[0].substring(1)), 10);
    const g = parseInt(trim(inParts[1]), 10);
    const b = parseInt(trim(inParts[2]), 10);
    const a: any = parseFloat(trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(2);
    const outParts = [
        r.toString(16),
        g.toString(16),
        b.toString(16)
    ];

    if (inParts.length > 3) {
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

const trim = (str: string): string => {
    return str.replace(/^\s+|\s+$/gm, '');
};

export const mixinRgba = (base, added: number[]): string => {
    const mix = [];
    mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
    mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3])); // red
    mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3])); // green
    mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3])); // blue

    return `"rgba(${base.join(',')})`;
};
