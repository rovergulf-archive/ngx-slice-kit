import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    Output,
    PLATFORM_ID
} from '@angular/core';
import { SidenavService } from './sidenav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import {SidenavState} from './sidenav.options';

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
export class SidenavComponent implements OnDestroy, AfterViewInit {

    public sub = new Subscription();

    @Input() public styles;

    @Input() public set opened(st: boolean) {
        this.sidenavService.isOpened = st;
    }

    @HostBinding('class') public get currentMode(): string {
        return `sdk-sidenav--${this.sidenavService.options.mode}`;
    }

    @HostBinding(`class.active`) public get isOpened(): boolean {
        return this.sidenavService.isOpened;
    }

    @HostBinding(`style`) public get getExternalStyles(): string {
        return this.styles ?? '';
    }

    @HostBinding('@state') public get openClose(): SidenavState {
        return this.sidenavService.openedState;
    }

    constructor(
        @Inject(PLATFORM_ID) platformId: any,
        private el: ElementRef,
        public sidenavService: SidenavService
    ) {
    }

    public ngAfterViewInit(): void {
        this.sub = this.sidenavService.openedObservableState.subscribe(st => {
            this.sidenavService.updateOptions({
                width: this.el.nativeElement.clientWidth,
            });
        });
    }

    public ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
