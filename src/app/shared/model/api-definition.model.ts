export type apiDefinitionSource = string | ApiDefinitionSource;

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

export class ApiDefinition {
    label: string;
    type: string;
    description?: string = '';
    args?: any[];
    value?: any;
    required?: boolean = false;
    default_value?: any = undefined;

    argsVisible?: boolean;

    constructor(src: ApiDefinition) {
        Object.assign(this, src);
    }
}
