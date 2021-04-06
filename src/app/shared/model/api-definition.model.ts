export class ApiDefinition {
    title: string;
    description?: string;
    values?: string[];
    required?: boolean;
    default_value?: any;

    constructor(src: ApiDefinition) {
        Object.assign(this, src);
    }
}
