import { Component, OnInit } from '@angular/core';
import { DemoPageModel } from '../../shared/model';

@Component({
    selector: 'app-get-started',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss', '../guides.component.scss']
})
export class GetStartedComponent implements OnInit {

    ngExample = `ng add @angular/cdk
ng add ngx-slice-kit`;
    npmExample = `npm install @angular/cdk ngx-slice-kit --save`;
    appModuleExample = `import { ToggleModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add ToggleModule export
        SliceKitModule,
    ],
    exports: [
        // export module to be available in whole application
        SliceKitModule,
    ]
})
export class SharedModule {
}`;
    batchModuleExample = `import { ButtonsModule, ModalsModule, DropdownsModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // import slice-kit by feature modules
        ButtonsModule,
        ModalsModule,
        DropdownsModule,
    ],
    exports: [
        ButtonsModule,
        ModalsModule,
        DropdownsModule,
    ]
})
export class SharedModule {
}`;
    componentModuleExample = `import {
    ToggleModule,
    ButtonModule,
    AlertModule,
    PopupModule,
    InputModule,
    DividerModule,
} from 'ngx-slice-kit';

const sliceKitImports = [
    ToggleModule,
    ButtonModule,
    AlertModule,
    PopupModule,
    InputModule,
    DividerModule,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add slice-kit imports
        ...sliceKitImports
    ],
    exports: [
        // share components through module
        ...sliceKitImports
    ],
    providers: [],
    schemas: [],
})
export class SharedModule {
}`;
    themeExample = `<div sdk-theme>
    <app-header></app-header>
    <router-outlet></router-outlet>
</div>
`;

    constructor() {
    }

    ngOnInit(): void {
    }

}
