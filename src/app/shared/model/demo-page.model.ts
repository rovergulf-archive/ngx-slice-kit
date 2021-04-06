import { DemoExample } from './demo-component.model';
import { ApiDefinition } from './api-definition.model';

export class DemoPageModel {
    title: string;
    subtitle?: string;
    demo_name?: string;

    demos?: DemoExample[];
    apis?: ApiDefinition[];

    constructor(src: DemoPageModel) {
        Object.assign(this, src);

        if (this.demos?.length > 0) {
            this.demos = this.demos.map(d => new DemoExample(d));
        }

        if (this.apis?.length > 0) {
            this.apis = this.apis.map(a => new ApiDefinition(a));
        }
    }
}
