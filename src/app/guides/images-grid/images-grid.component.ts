import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-images-grid',
    templateUrl: './images-grid.component.html',
    styleUrls: ['./images-grid.component.scss', '../guides.component.scss']
})
export class ImagesGridComponent implements OnInit {

    loading: boolean = true;
    rows = [];

    constructor() {
    }

    generateRgb(): string {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r},${g},${b})`;
    }

    ngOnInit(): void {
        for (let i = 0; i < 38; i++) {
            this.rows.push({
                i: Math.floor(Math.random() * i) + 1,
                color: this.generateRgb()
            });
        }
        this.loading = false;
    }

}
