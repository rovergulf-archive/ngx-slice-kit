export class DemoExample {
    title: string;
    description: string;
    values: any;

    templateRef?: any;

    constructor(src: DemoExample) {
        Object.assign(this, src);
    }
}
