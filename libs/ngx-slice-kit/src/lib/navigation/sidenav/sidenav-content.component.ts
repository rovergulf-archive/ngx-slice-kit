import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'sdk-sidenav-content',
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./sidenav-content.component.scss'],
    animations: [
        trigger('state', [
            state('opened', style({
                marginLeft: '{{marginLeft}}px'
            }), {params: {marginLeft: 0}}),
            state('closed', style({
                marginLeft: '0'
            })),
            transition('opened => closed', [
                animate('0.2s')
            ]),
            transition('closed => opened', [
                animate('0.2s')
            ]),
        ]),
    ]
})
export class SidenavContentComponent implements OnInit, OnDestroy {

    @HostBinding('@state') get state() {
        return {
            value: this.sidenavService.openedState,
            params: {
                marginLeft: this.marginLeft ?? 0
            }
        };
    }

    get marginLeft(): number {
        return this.sidenavService.options.mode === 'over' ? 0 : this.sidenavService.options.width;
    }

    constructor(
        public sidenavService: SidenavService
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}
