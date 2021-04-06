export class DemoExample {
    title: string;
    description: string;
    ts_component_val: string;
    ts_module_val?: string;
    html_val?: string;
    styles_val?: string;

    templateRef: any;

    constructor(src: DemoExample) {
        Object.assign(this, src);
    }
}
