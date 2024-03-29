export class ApiDefinitionSource {
    label: string;
    type: string;
    description?: string;
    url?: string;
    required?: boolean;
    args?: string;
    values?: any[];

    constructor(src: ApiDefinitionSource) {
        Object.assign(this, src);
    }
}
