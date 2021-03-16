export const defaultBaseRgb = `26, 26, 26`;
export const defaultOppositeRgb = `255, 255, 255`;
export const defaultRegularRgb = `95, 95, 95`;
export const defaultPrimaryRgb = `0, 85, 255`;
export const defaultSuccessRgb = `39, 174, 96`;
export const defaultAccentRgb = `255, 168, 38`;
export const defaultWarnRgb = `238, 112, 112`;

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
};

export const textDepth = {
    'a-40': 'placeholder',
    'a-80': 'text',
    a100: 'text-reverse',
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

class ColorProperty {
    name: string;
    value: string;

    constructor(cp: ColorProperty) {
        Object.assign(this, cp);
    }

    set base(color: string) {
        this.value = color;
    }

    get rgb(): string {
        return this.base ? `var(--${this.base}-rgb)` : this.value;
    }

    get hex(): string {
        return ``;
    }

    alpha(): string {
        return '';
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
            this.baseRgb = defaultBaseRgb;
        }

        if (this.oppositeRgb === '') {
            this.oppositeRgb = defaultOppositeRgb;
        }

        if (this.regularRgb === '') {
            this.regularRgb = defaultRegularRgb;
        }

        if (this.primaryRgb === '') {
            this.primaryRgb = defaultPrimaryRgb;
        }

        if (this.successRgb === '') {
            this.successRgb = defaultSuccessRgb;
        }

        if (this.accentRgb === '') {
            this.accentRgb = defaultAccentRgb;
        }

        if (this.warnRgb === '') {
            this.warnRgb = defaultWarnRgb;
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

            for (let ind = 100; ind >= 0; ind--) {
                if (ind % 5 === 0) {
                    const alpha = `a${ind}`;
                    results.push({
                        name: `--${color}-${alpha}`,
                        value: `rgba(rgb, ${ind})`
                    });
                }
            }

            if (colors.indexOf(color) > 1) {
                results.concat(results, objectToColorProperties(colorsDepth, color));
                results.concat(results, objectToColorProperties(textDepth, color));
            }
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

}

const objectToColorProperties = (srcObj: any, color: string): ColorProperty[] => {
    const results: ColorProperty[] = [];

    for (const key of Object.keys(srcObj)) {
        if (srcObj.hasOwnProperty(key)) {
            const keyName = srcObj[key];
            const alpha = parseInt(key.substring(1), 10) / 100;
            const colorVar = alpha > 0 ? 'var(--base-rgb)' : 'var(--opposite-rgb)';
            const prop = {
                name: `--${color}-${keyName}`,
                value: `var(--${color}-${key})`
            };
            console.log(prop);
            results.push(new ColorProperty(prop as ColorProperty));
        }
    }

    return results;
};
