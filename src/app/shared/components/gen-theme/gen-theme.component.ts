import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Theme, themeLight } from 'ngx-slice-kit';
import { defaultColors } from '../../../../../libs/ngx-slice-kit/src/lib/core/theme/theme.model';

@Component({
    selector: 'lib-gen-theme',
    templateUrl: './gen-theme.component.html',
    styleUrls: ['./gen-theme.component.scss']
})
export class GenThemeComponent implements OnInit, OnDestroy {

    @Output() created: EventEmitter<any> = new EventEmitter<any>();

    theme: Theme = new Theme({
        name: 'custom',
        ...defaultColors
    });

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.created.complete();
    }

}
