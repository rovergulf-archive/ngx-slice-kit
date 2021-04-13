import { SafeUrl } from '@angular/platform-browser';
import { DemoExample } from './demo-component.model';
import { ApiDefinition } from './api-definition.model';
import { ApiDefinitionsGroup } from './api-group.model';

export class DemoPageModel {
    title: string;
    subtitle?: string;
    demo_name?: string;

    stackblitz_url?: string;
    stackblitz_safe_url?: SafeUrl;
    demoTitle?: string;
    sourceTitle?: string;

    customContentRef?: any;
    demos?: DemoExample[];
    apis?: ApiDefinition[];
    api_groups?: ApiDefinitionsGroup[];

    apiVisible?: boolean;
    hideDemo?: boolean = false;
    hideSourceTitle?: boolean = false;

    constructor(src: DemoPageModel) {
        Object.assign(this, src);

        if (this.demos?.length > 0) {
            this.demos = this.demos.map(de => new DemoExample(de));
        }

        if (this.apis?.length > 0) {
            this.apis = this.apis.map(ad => new ApiDefinition(ad as ApiDefinition));
            this.api_groups = [
                {
                    name: '',
                    apis: this.apis,
                },
            ];
        }

        if (this.apis?.length > 0) {
            this.api_groups = this.api_groups.map(adg => new ApiDefinitionsGroup(adg as ApiDefinitionsGroup));
        }

        this.apiVisible = !!this.api_groups?.find(adg => adg.apis.length > 0);

        if (!this.demoTitle) {
            this.demoTitle = `Demo:`;
        }

        if (!this.sourceTitle) {
            this.sourceTitle = `Source code:`;
        }
    }
}
