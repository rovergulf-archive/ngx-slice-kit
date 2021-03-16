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

export const colorsDepth = [
    `rgb`, `deep`, `hover`, `active`, `disabled`, `smooth`, `placeholder`, `text`, `text-reverse`
];

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

    public props?(): { name: string, value: string }[] {
        const results = [];

        for (const color of colors) {
            const cKey = `${color}Rgb`;
            const rgb = this[cKey];
            results.push({
                name: `--${color}`,
                value: rgb
            });

            for (const d of colorsDepth) {
                const depth = `--${color}-${d}`;
                const dRgb = `${rgb},`;
                results.push({
                    name: depth,
                    value: dRgb,
                });
            }
        }

        return results;
    }
}
