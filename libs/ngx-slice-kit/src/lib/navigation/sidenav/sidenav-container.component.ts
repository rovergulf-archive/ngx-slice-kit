import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { SidenavMode, SidenavOptions } from "./sidenav.options";

@Component({
    selector: 'sdk-sidenav-container',
    templateUrl: './sidenav-container.component.html',
    styleUrls: ['./sidenav-container.component.scss'],
})
export class SidenavContainerComponent implements OnInit, OnDestroy {

    @Input() hasBackdrop: boolean = false;

    @Input() set mode(mode: SidenavMode) {
        this.sidenavService.updateOptions({mode});
    }

    get mode() {
        return this.sidenavService.options.mode;
    }

    constructor(
        public sidenavService: SidenavService,
    ) {
    }

    closeSide() {
        this.sidenavService.isOpened = false;
    }

    ngOnInit() {
        this.sidenavService.options = new SidenavOptions({
            mode: this.mode
        });
    }

    ngOnDestroy(): void {

    }
}
