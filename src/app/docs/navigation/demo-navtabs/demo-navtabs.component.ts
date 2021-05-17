import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-navtabs',
    templateUrl: './demo-navtabs.component.html',
    styleUrls: ['./demo-navtabs.component.scss', '../../docs.module.scss']
})
export class DemoNavtabsComponent implements OnInit {

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

    ngOnInit(): void {}
}
