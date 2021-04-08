export class DemoExample {
    title: string;
    description: string;
    values: {
        html?: string,
        component?: string,
        module?: string,
        styles?: string,
    };

    templateRef?: any;

    constructor(src: DemoExample) {
        Object.assign(this, src);
    }
}
