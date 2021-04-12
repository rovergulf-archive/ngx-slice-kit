import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-sidenav',
    templateUrl: './demo-sidenav.component.html',
    styleUrls: ['../../docs.module.scss']
})
export class DemoSidenavComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    constructor() {
    }

    ngOnInit(): void {
        this.page = {
            title: 'Sidenav component example',
            subtitle: '',
            stackblitz_url: 'https://stackblitz.com/edit/ngx-slice-kit-sidenav-example',
            hideDemo: true,
            demos: [
                {
                    title: 'Default usage',
                    description: '',
                    values: {
                        html: `<sdk-sidenav-container [hasBackdrop]="layoutService.mobileLayout"
                               [mode]="layoutService.mobileLayout ? 'over' : 'side'">
    <sdk-sidenav [opened]="layoutService.sidenavOpened" [styles]="sideNavStyle">
        <app-sidenav></app-sidenav>
    </sdk-sidenav>
    <sdk-sidenav-content>
        <section class="view flex-grow-1">
            <router-outlet></router-outlet>
        </section>
    </sdk-sidenav-content>
</sdk-sidenav-container>`,
                        module: `import { SidenavModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add SidenavModule to app imports
        SidenavModule,
    ],
})
export class DemoSidenavModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-sidenav',
    templateUrl: './demo-sidenav.component.html',
    styleUrls: ['./demo-sidenav.component.scss']
})
export class DemoSidenavComponent {

    sideNavStyle = {
        'border-right': '1px solid var(--regular-disabled)',
        'background-color': 'var(--background)',
        width: '320px',
        padding: '72px 0 16px 0'
    };

    constructor() {
    }

}`,
                        styles: `sdk-sidenav-container {
    min-height: 100%;
    z-index: 99;
}`,
                    },
                }
            ],
            api_groups: [
                {
                    name: 'SidenavComponent',
                    apis: [
                        {
                            label: '[opened]',
                            type: 'boolean',
                            description: 'Sets component opened state',
                        },
                        {
                            label: '[styles]',
                            type: 'CssDefinition',
                            description: '',
                        },
                    ],
                },
                {
                    name: 'SidenavContainerComponent',
                    apis: [
                        {
                            label: '[mode]',
                            type: 'SidenavMode',
                            description: 'Available modes: "over" and "side"',
                        },
                        {
                            label: '[hasBackdrop]',
                            type: 'boolean',
                        }
                    ],
                },
            ],
        };
    }

}
