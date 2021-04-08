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
})
export class DemoToggleModule {
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
