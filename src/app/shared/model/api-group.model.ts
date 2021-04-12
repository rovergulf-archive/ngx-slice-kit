import { ApiDefinition } from './api-definition.model';

export class ApiDefinitionsGroup {
    name: string;
    apis: ApiDefinition[];

    argsVisible?: boolean;

    constructor(src: ApiDefinitionsGroup) {
        Object.assign(this, src);

        if (this.apis?.length > 0) {
            this.apis = this.apis.map(a => new ApiDefinition(a));
        }

        this.argsVisible = !!this.apis.find(ad => ad.argsVisible);
    }

}
