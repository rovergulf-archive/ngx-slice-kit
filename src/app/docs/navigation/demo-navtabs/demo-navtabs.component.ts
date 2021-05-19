import { Component, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-navtabs',
    templateUrl: './demo-navtabs.component.html',
    styleUrls: ['./demo-navtabs.component.scss', '../../docs.module.scss']
})
export class DemoNavtabsComponent implements OnInit {

    @ViewChild('basicRef', {static: true}) basicRef: any;

    page: DemoPageModel;

    links = [
        {src: 'demo-first', label: 'Lord of the rings: Return of the King'},
        {src: 'demo-second', label: 'Tab Number Two', disabled: true},
        {src: 'demo-third', label: 'Millennium falcon'},
        {src: 'demo-fourth', label: 'Lord of the rings: The Fellowship of the Ring'},
        {src: 'demo-fifth', label: 'Lord of the rings: The Two Towers'},
        {src: 'demo-sixth', label: 'Disabled tab', disabled: true},
        {src: 'demo-seventh', label: 'The Empire strikes back'},
        {src: 'demo-eighth', label: 'Double dare you once again'},
    ];

    constructor() {}

    ngOnInit(): void {
        this.page = {
            title: 'Nav-tabs usage example',
            subtitle: '',
            demos: [
                {
                    title: 'Nav-tabs',
                    description: '',
                    templateRef: this.basicRef,
                    values: {
                        html: `<section class="flex-column layout-start-stretch">
    <h2>Nav tabs</h2>
    <div class="example flex-column layout-start-stretch">
        <sdk-nav-tab-group [animation]="true" [minHeight]="1048">
            <a sdkTabLink *ngFor="let link of links"
               [disabled]="link.disabled"
               [routerLink]="link.src"
               [label]="link.label"></a>
        </sdk-nav-tab-group>
    </div>
</section>`,
                        module: `import { NavTabsModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add your routing module
        SomeRoutingModule
        // add NavTabsModule to app imports
        NavTabsModule,
    ],
})
export class DemoNavTabsModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-navtabs',
    templateUrl: './demo-navtabs.component.html',
    styleUrls: ['./demo-navtabs.component.scss']
})
export class DemoNavtabsComponent {

    links = [
        {src: 'demo-first', label: 'Lord of the rings: Return of the King'},
        {src: 'demo-second', label: 'Tab Number Two', disabled: true},
        {src: 'demo-third', label: 'Millennium falcon'},
        {src: 'demo-fourth', label: 'Lord of the rings: The Fellowship of the Ring'},
        {src: 'demo-fifth', label: 'Lord of the rings: The Two Towers'},
        {src: 'demo-sixth', label: 'Disabled tab', disabled: true},
        {src: 'demo-seventh', label: 'The Empire strikes back'},
        {src: 'demo-eighth', label: 'Double dare you once again'},
    ];

    constructor() {
    }

}`,
                    },
                }
            ],
            apis: [
            ]
        };
    }
}
