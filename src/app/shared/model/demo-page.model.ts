import { DemoExample } from './demo-component.model';
import { ApiDefinition } from './api-definition.model';

export class DemoPageModel {
    title: string;
    subtitle?: string;
    demo_name?: string;

    demos?: DemoExample[];
    apis?: ApiDefinition[];
    api_groups?: ApiDefinitionsGroup[];

    apiVisible?: boolean;

    constructor(src: DemoPageModel) {
        Object.assign(this, src);

        if (this.demos?.length > 0) {
            this.demos = this.demos.map(de => new DemoExample(de));
        }

        if (this.apis?.length > 0) {
            this.apis = this.apis.map(ad => new ApiDefinition(ad as ApiDefinition));
        }

        this.api_groups = [
            {
                name: '',
                apis: this.apis,
            },
        ];
        this.api_groups = this.api_groups.map(adg => new ApiDefinitionsGroup(adg as ApiDefinitionsGroup));

        this.apiVisible = !!this.api_groups.find(adg => adg.apis.length > 0);
    }
}

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
