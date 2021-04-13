export class ApiDefinition {
    label: string;
    type: string;
    description?: string = '';
    url?: string;
    args?: any[];
    value?: any;
    required?: boolean = false;
    default_value?: any = undefined;

    argsVisible?: boolean;

    constructor(src: ApiDefinition) {
        Object.assign(this, src);
    }
}
