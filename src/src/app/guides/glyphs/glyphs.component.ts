import { Component, OnInit } from '@angular/core';

import { GLYPHS } from 'ngx-slice-kit';

const NOT_PUBLIC = ['inkbe', 'ambassador', 'notifications_tear', 'verified']

@Component({
    selector: 'app-glyphs',
    templateUrl: './glyphs.component.html',
    styleUrls: ['./glyphs.component.scss', '../guides.module.scss']
})
export class GlyphsComponent implements OnInit {

    glyphs: string[] = [];

    constructor() {
    }

    ngOnInit() {
        for (let key in GLYPHS) {
            if (GLYPHS.hasOwnProperty(key)) {
                if (NOT_PUBLIC.indexOf(key) < 0) {
                    this.glyphs.push(key);
                }
            }
        }
    }

}
