import { ApiDefinition } from './api-definition.model';

export class ApiDefinitionsGroup {
    name: string;
    apis: ApiDefinition[];

    constructor(src: ApiDefinitionsGroup) {
        Object.assign(this, src);

        if (this.apis?.length > 0) {
            this.apis = this.apis.map(a => new ApiDefinition(a as ApiDefinition));
        }
    }

}
