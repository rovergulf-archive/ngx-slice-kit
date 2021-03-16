export const defaultBaseRgb = `26, 26, 26`;
export const defaultOppositeRgb = `255, 255, 255`;
export const defaultRegularRgb = `95, 95, 95`;
export const defaultPrimaryRgb = `0, 85, 255`;
export const defaultSuccessRgb = `39, 174, 96`;
export const defaultAccentRgb = `255, 168, 38`;
export const defaultWarnRgb = `238, 112, 112`;

export const defaultColors = {
    base: `26, 26, 26`,
    opposite: `255, 255, 255`,
    regular: `95, 95, 95`,
    primary: `0, 85, 255`,
    success: `39, 174, 96`,
    accent: `255, 168, 38`,
    warn: `238, 112, 112`,
};

export const colors = [
    `base`, `opposite`, `regular`, `primary`, `success`, `accent`, `warn`
];

export const emptyDepth = ``;
export const rgbDepth = `rgb`;

export const colorsDepth = {
    a100: 'rgb',
    a80: 'deep',
    a95: 'hover',
    a75: 'active',
    a50: 'disabled',
    a10: 'smooth',
    b45: 'text-placeholder',
    b80: 'text',
};

// '--regular-rgb': '95,95,95',
//     '--regular-deep': 'rgb(66,66,66)',
//     '--regular': 'rgb(95,95,95)', // rgba(26, 26, 26, 0.70)
//     '--regular-hover': 'rgb(163, 163, 163)', // rgba(26, 26, 26, 0.40)
//     '--regular-active': 'rgb(200, 200, 200)', // rgba(26, 26, 26, 0.24)
//     '--regular-disabled': 'rgb(233, 233, 233)', // rgba(26, 26, 26, 0.1)
//     '--regular-smooth': 'rgb(246, 246, 246)', // rgba(26, 26, 26, 0.1)
//     '--regular-placeholder': 'rgb(163, 163, 163)',
//     '--regular-text': 'rgb(var(--opposite-rgb))',
//     '--regular-text-reverse': 'rgb(var(--base-rgb))',

const alphaLimit = 100;
const alphaStep = 5;

class ColorProperty {
    value: string;
    name?: string;
    alpha?: number = 1;
    rgb?: string;
    rgba?: string;
    hex?: string;

    constructor(cp?: ColorProperty) {
        Object.assign(this, cp);
    }
}

export class Theme {
    name: string;
    properties?: any;

    // there goes RGB colors
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

            for (let ind = 0; ind <= alphaLimit; ind += 5) {
                const value = `${rgb}, ${ind / 100}`;
                results.push({
                    name: `--${color}-a${ind}`,
                    value,
                    rgb: `rgb(${rgb})`,
                    rgba: `rgba(${rgb}, ${ind / 100})`,
                });
            }

            // if (colors.indexOf(color) > 1) {
            // }
            results.push(...this.objectToColorProperties(colorsDepth, color));
        }

        results.push({
            name: '--background',
            value: 'rgb(var(--opposite-rgb))'
        }, {
            name: '--color',
            value: 'var(--regular-text)'
        });

        return results;
    }

    private objectToColorProperties?(srcObj: any, color: string): ColorProperty[] {
        const results: ColorProperty[] = [];

        for (const key of Object.keys(srcObj)) {
            if (srcObj.hasOwnProperty(key)) {
                const keyName = srcObj[key];
                const prefix = key.substring(0, 1);
                const alpha = parseInt(key.substring(1), 10) / 100;
                const varName = prefix === 'b' ? 'base' : color;
                const value = this[`${varName}Rgb`];
                const prop: ColorProperty = {
                    name: `--${color}-${keyName}`,
                    rgb: `rgb(${value})`,
                    rgba: `rgba(${value}, ${alpha})`,
                } as ColorProperty;
                console.log(prop.name, prop.rgba);
                results.push(prop as ColorProperty);
            }
        }

        return results;
    }

}
