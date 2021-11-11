import { Component, Input, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { SidenavMode, SidenavOptions } from './sidenav.options';

@Component({
    selector: 'sdk-sidenav-container',
    templateUrl: './sidenav-container.component.html',
    styleUrls: ['./sidenav-container.component.scss'],
})
export class SidenavContainerComponent implements OnInit {

    @Input()public  hasBackdrop: boolean = false;

    @Input()public  set mode(mode: SidenavMode) {
        this.sidenavService.updateOptions({mode});
    }

    public get mode(): SidenavMode {
        return this.sidenavService.options.mode;
    }

    constructor(
        public sidenavService: SidenavService,
    ) {
    }

    public closeSide(): void {
        this.sidenavService.isOpened = false;
    }

    public ngOnInit(): void {
        this.sidenavService.options = new SidenavOptions({
            mode: this.mode
        });
    }
}
