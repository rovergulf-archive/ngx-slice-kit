import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-navtabs',
    templateUrl: './demo-navtabs.component.html',
    styleUrls: ['./demo-navtabs.component.scss', '../../docs.module.scss']
})
export class DemoNavtabsComponent implements OnInit {

    links = [
        {src: 'demo-first', label: 'First tab'},
        {src: 'demo-second', label: 'Tab Number Two', disabled: false},
        {src: 'demo-third', label: 'Randomly name so long and im no tired'},
        {src: 'demo-fourth', label: 'Why do we should put the long titles'},
        {src: 'demo-fifth', label: 'Tab tab tab tab tab tab tab3 long'},
        {src: 'demo-sixth', label: 'Tab tab tab tab tab tab tab4 long', disabled: false},
        {src: 'demo-seventh', label: 'Tab tab tab tab tab tab tab5 long'},
        {src: 'demo-eighth', label: 'Double dare you once again'},
    ];

    constructor() {}

    ngOnInit(): void {}
}
