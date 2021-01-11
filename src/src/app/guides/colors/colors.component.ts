import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.scss', '../guides.module.scss']
})
export class ColorsComponent implements OnInit {

    tones = [
        {
            name: 'Basic',
            background: ''
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
