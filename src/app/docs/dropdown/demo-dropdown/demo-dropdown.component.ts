import { Component, OnInit, ViewChild } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';
import { OPTIONS1, OPTIONS2, OPTIONS3 } from '../../../shared/values/dropdowns.values';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-dropdown',
    templateUrl: './demo-dropdown.component.html',
    styleUrls: ['./demo-dropdown.component.scss', '../../docs.module.scss']
})
export class DemoDropdownComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;

    page: DemoPageModel;

    val1: any = '';
    val2: any = '';
    // result3: any = '';

    options1: OptionModel[] = OPTIONS3;
    options2: OptionModel[] = OPTIONS3;
    // options3: OptionModel[] = OPTIONS3;

    constructor() {
    }

    firstResult(ev: any): void {
        // console.log('first: ', ev);
        this.val1 = ev.label;
    }

    secondResult(ev: any): void {
        // console.log('second: ', ev);
        this.val2 = ev.label;
    }

    // thirdResult(ev: any): void {
    //     // console.log('third: ', ev);
    //     this.result3 = ev.label;
    // }

    ngOnInit(): void {
        this.page = {
            title: 'Dropdown directive examples',
            subtitle: '',
            demos: [
                {
                    title: 'Default dropdown',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="dropdown-container">
    <div class="wrapper">
        <p sdkDropdownMenuTrigger [options]="options1"
                                  (resultEvent)="firstResult($event)">Choose book: {{val1}}</p>
    </div>
    <div class="wrapper">
        <button sdk-flat-button sdkDropdownMenuTrigger
                [options]="options2"
                (resultEvent)="secondResult($event)">Favourite anime: {{val2}}</button>
    </div>
</div>`,
                        styles: `.dropdown-container {
    p[sdkDropdownMenuTrigger] {
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }

    .wrapper {
        margin: 16px;
    }
}`,
                        module: `import { DropdownsModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add DropdownsModule to app imports
        DropdownsModule,
    ],
})
export class SelectModule {
}`,
                        component: `import { Component } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';

const OPTIONS: OptionModel[] = [
    {value: 1, label: 'Tom Sawyer'},
    {value: 2, label: 'Lord Of The Rings'},
    {value: 3, label: 'Call Of Cthulhu'},
    {value: 4, label: 'Wiedzmin'},
    {value: 5, label: 'Crime and punishment'}
];

@Component({
    selector: 'app-demo-dropdown',
    templateUrl: './demo-dropdown.component.html',
    styleUrls: ['./demo-dropdown.component.scss']
})
export class DemoDropdownComponent {

    this.options1 = OPTIONS;
    this.options2 = OPTIONS;

    val1: OptionModel;
    val2: OptionModel;

    constructor() {
    }

    firstResult(ev: any): void {
        this.val1 = ev.label;
    }

    secondResult(ev: any): void {
        this.val2 = ev.label;
    }
}`,
                    }
                },
            ],
            api_groups: [
                {
                    name: 'DropdownMenuTriggerDirective',
                    apis: [
                        {
                            label: '[options]',
                            type: 'OptionModel[]',
                            description: 'Options list of select dropdown'
                        },
                        {
                            label: '[fitWidth]',
                            type: 'boolean',
                            description: 'Set dropdown menu with the width of the trigger element',
                            default_value: 'false'
                        }
                    ]
                }
            ]
        };
    }

}
