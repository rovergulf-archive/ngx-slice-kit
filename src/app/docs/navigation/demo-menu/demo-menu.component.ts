import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-menu',
    templateUrl: './demo-menu.component.html',
    styleUrls: ['./demo-menu.component.scss', '../../docs.module.scss']
})
export class DemoMenuComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Nav menu component example',
            subtitle: '',
            stackblitz_url: 'https://stackblitz.com/edit/angular-ivy-c2skrk',
            hideDemo: true,
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    values: {
                        html: `<sdk-nav-menu>
    <sdk-nav-menu-group label="Example links">
        <a sdk-nav-menu-item routerLinkActive="active"
           routerLink="/href1">Href 1</a>
        <a sdk-nav-menu-item routerLinkActive="active"
           routerLink="/href2">Href 2</a>
        <a sdk-nav-menu-item routerLinkActive="active"
           routerLink="/href3">Href 3</a>
        <a sdk-nav-menu-item routerLinkActive="active"
           routerLink="/href4">Href 4</a>
        <a sdk-nav-menu-item routerLinkActive="active"
           routerLink="/href5">Href 5</a>
    </sdk-nav-menu-group>
</sdk-nav-menu>`,
                        module: `import { NavMenuModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add NavMenuModule to app imports
        NavMenuModule,
    ],
})
export class DemoNavMenuModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-nav-menu',
    templateUrl: './demo-nav-menu.component.html',
    styleUrls: ['./demo-nav-menu.component.scss']
})
export class DemoNavMenuComponent {

    constructor() {
    }

}`,
                        styles: ``,
                    },
                }
            ],
            api_groups: [
                {
                    name: 'NavMenuGroupComponent',
                    apis: [
                        {
                            label: '[label]',
                            type: 'string',
                            description: '',
                        },
                        {
                            label: '[isOpen]',
                            type: 'boolean',
                            description: '',
                        },
                    ],
                },
                {
                    name: 'NavMenuItemComponent',
                    apis: [
                        {
                            label: 'sdk-nav-menu-item',
                            type: '',
                            description: '',
                        },
                    ],
                },
            ],
        };
    }

}
