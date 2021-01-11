import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID
} from '@angular/core';
import { SidenavService } from './sidenav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sdk-sidenav',
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./sidenav.component.scss'],
    animations: [
        trigger('state', [
            state('opened', style({
                transform: 'none'
            })),
            state('closed', style({
                transform: 'translateX(-100%)',
                opacity: '0'
            })),
            transition('opened => closed', [
                animate('0.2s 0.03s')
            ]),
            transition('closed => opened', [
                animate('0.2s 0.035s')
            ]),
        ]),
    ]
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {

    sub = new Subscription();

    @Input('style') styles;

    @Input('opened') set opened(state: boolean) {
        this.sidenavService.isOpened = state;
    };

    @Output('opened') onOpen = new EventEmitter<boolean>();

    @HostBinding('class') get currentMode() {
        return `sdk-sidenav--${this.sidenavService.options.mode}`;
    }

    @HostBinding(`class.active`) get isOpened() {
        return this.sidenavService.isOpened;
    }

    @HostBinding(`style`) get getExternalStyles() {
        return this.styles ?? '';
    }

    @HostBinding('@state') get openClose() {
        return this.sidenavService.openedState;
    }

    constructor(
        @Inject(PLATFORM_ID) platformId: any,
        private el: ElementRef,
        public sidenavService: SidenavService
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.sub = this.sidenavService.openedObservableState.subscribe(state => {
            this.onOpen.emit(state);
            this.sidenavService.updateOptions({
                width: this.el.nativeElement.clientWidth,
            });
        });
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}
