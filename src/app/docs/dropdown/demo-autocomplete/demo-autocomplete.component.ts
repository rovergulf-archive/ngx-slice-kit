import { Component, OnInit, ViewChild } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';
import { OPTIONS1, OPTIONS2, OPTIONS3, OPTIONS4, OPTIONS5 } from '../../../shared/values/dropdowns.values';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-autocomplete',
    templateUrl: './demo-autocomplete.component.html',
    styleUrls: ['./demo-autocomplete.component.scss', '../../docs.module.scss']
})
export class DemoAutocompleteComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('captionRef', {static: true}) captionRef: any;

    page: DemoPageModel;

    options1: OptionModel[] = OPTIONS1;
    options2: OptionModel[] = OPTIONS1;
    options3: OptionModel[] = OPTIONS1;
    options4: OptionModel[] = OPTIONS1;
    // options5: OptionModel[] = OPTIONS1;

    val1: OptionModel;
    val2: OptionModel;
    val3: OptionModel;
    val4: OptionModel;

    // val5: OptionModel;

    constructor() {
    }

    onValueChange(ev: any, optionsName: string): void {
        this[optionsName] = ev?.length > 0 ? OPTIONS1.filter(o => {
            return o.label.toLowerCase().includes(ev.toLowerCase());
        }) : OPTIONS1;
    }

    checkSelect(target: string, val: any): void {
        if (val) {
            this[target] = val;
        }
    }

    ngOnInit(): void {
        this.page = {
            title: 'Autocomplete component examples',
            subtitle: '',
            demos: [
                {
                    title: 'Default autocomplete',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: ` <div class="autocomplete-container">
    <div class="wrapper">
        <sdk-autocomplete [options]="options1"
                          [(ngModel)]="val1"
                          (valueChanges)="onValueChange($event, 'options1')"
                          placeholder="Find option"
                          label="Favourite game"></sdk-autocomplete>
    </div>
    <div class="wrapper">
        <sdk-autocomplete [small]="true"
                          [options]="options2"
                          [(ngModel)]="val2"
                          (valueChanges)="onValueChange($event, 'options2')"
                          placeholder="Find option"
                          label="Favourite game"></sdk-autocomplete>
    </div>
</div>`,
                        styles: `.autocomplete-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .wrapper {
        max-width: 320px;
        margin: 12px;
    }
}`,
                        module: `import { AutocompleteModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add AutocompleteModule to app imports
        AutocompleteModule,
    ],
})
export class AutocompleteModule {
}`,
                        component: `import { Component } from '@angular/core';
import { OptionModel } from 'ngx-slice-kit';

const OPTIONS: OptionModel[] = [
    {value: 1, label: 'Red Dead Redemption 2'},
    {value: 2, label: 'Death Stranding'},
    {value: 3, label: 'Bloodborne'},
    {value: 4, label: 'Witcher 3'},
    {value: 5, label: 'Cyberpunk 2077'},
    {value: 6, label: 'Assassins Creed: Valhalla'},
    {value: 7, label: 'Mortal Kombat 11'}
];

@Component({
    selector: 'app-demo-autocomplete',
    templateUrl: './demo-autocomplete.component.html',
    styleUrls: ['./demo-autocomplete.component.scss']
})
export class DemoAutocompleteComponent {

    options1: OptionModel[] = OPTIONS;
    options2: OptionModel[] = OPTIONS;

    val1: OptionModel;
    val2: OptionModel;

    constructor() {
    }

    onValueChange(ev: any, optionsName: string): void {
        this[optionsName] = ev?.length > 0 ? OPTIONS1.filter(o => {
            return o.label.toLowerCase().includes(ev.toLowerCase());
        }) : OPTIONS1;
    }

}`,
                    }
                },
                {
                    title: 'Caption & error',
                    description: '',
                    templateRef: this.captionRef,
                    values: {
                        html: `<div class="autocomplete-container">
    <div class="wrapper">
        <sdk-autocomplete [options]="options3"
                          [caption]="'Example caption'"
                          [(ngModel)]="val3"
                          (valueChanges)="onValueChange($event, 'options3')"
                          placeholder="Find option"
                          label="Caption example"></sdk-autocomplete>
    </div>
    <div class="wrapper">
        <sdk-autocomplete [options]="options4"
                          [(ngModel)]="val4"
                          (valueChanges)="onValueChange($event, 'options4')"
                          error="Error example"
                          placeholder="Find option"
                          label="Error example"></sdk-autocomplete>
    </div>
</div>`,
                    }
                }
            ],
            api_groups: [
                {
                    name: 'AutocompleteComponent',
                    apis: [
                        {
                            label: '[options]',
                            type: 'OptionModel[]',
                            description: 'Options list of autocomplete dropdown'
                        },
                        {
                            label: '[placeholder]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[caption]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[error]',
                            type: 'string',
                            description: `-`,
                        },
                        {
                            label: '[small]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '[disabled]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '[required]',
                            type: 'boolean',
                            description: `-`,
                            default_value: 'false'
                        },
                        {
                            label: '(focusEvent)',
                            type: 'EventEmitter',
                            description: `Emits focus autocomplete event at target subscription`,
                        },
                        {
                            label: '(blurEvent)',
                            type: 'EventEmitter',
                            description: `Emits blur autocomplete event at target subscription`,
                        },
                        {
                            label: '(resultEvent)',
                            type: 'EventEmitter',
                            description: `Emits result autocomplete event after option was selected`,
                        },
                        {
                            label: '(valueChanges)',
                            type: 'EventEmitter',
                            description: `Emits change autocomplete event when input value was changed`,
                        },
                    ],
                },
            ]
        };

        // this.val1 = this.options1[0];
    }

}
