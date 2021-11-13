import { Component } from '@angular/core';

export const angularJsonExampleRef = `// ...
// Double check that your core application styles file used in
// "ng build" and/or "ng serve" commands
"styles": [
    "src/styles.scss"
],
// ...`;

@Component({
    selector: 'app-get-started',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss', '../guides.module.scss']
})
export class GetStartedComponent {

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
    batchModuleExample = `import { ThemeModule, ButtonsModule, ModalsModule, DropdownsModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // theme module is required
        ThemeModule,
        // import feature modules
        ButtonsModule,
        ModalsModule,
        DropdownsModule,
    ],
    // optional
    exports: [
        ThemeModule,
        ButtonsModule,
        ModalsModule,
        DropdownsModule,
    ]
})
export class SharedModule {
}`;
    componentModuleExample = `import {
    ThemeModule,
    ToggleModule,
    ButtonModule,
    AlertModule,
    PopupModule,
    InputModule,
    DividerModule,
} from 'ngx-slice-kit';

const sliceKitImports = [
    // theme module is required
    ThemeModule,
    // import component modules
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
    // optional
    exports: [
        // share components through module
        ...sliceKitImports
    ],
    providers: [],
    schemas: [],
})
export class SharedModule {
}`;
    themeExample = `<div sdkTheme>
    <app-header></app-header>
    <router-outlet></router-outlet>
</div>
`;
    stylesExample = `@import '~ngx-slice-kit/src/lib/core/styles/core';`;
    angularJson = angularJsonExampleRef;

    constructor() {
    }

}
