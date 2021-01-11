import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'sdk-nav-menu-group',
    templateUrl: './nav-menu-group.component.html',
    styleUrls: ['./nav-menu-group.component.scss'],
    animations: [
        trigger('test', [
            state('open', style({
                opacity: 1,
            })),
            state('closed', style({
                height: '0px',
                opacity: 0,
            })),
            transition('open => closed', [
                animate('0.2s')
            ], {params: {startHeight: 0}}),
            transition('closed => open', [
                animate('0.2s')
            ], {params: {startHeight: 0}}),
        ]),
    ],
    encapsulation: ViewEncapsulation.None
})
export class NavMenuGroupComponent implements OnInit, AfterContentInit {

    @Input() label: string;
    @Input() isOpen: boolean = false;
    isActive: boolean = false;
    deepLvl: number = 1;

    constructor(
        private router: Router,
        private el: ElementRef
    ) {
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    checkIsActive(src: string): void {
        const i = src.indexOf('?');
        const search = i > 0 ? src.substring(0, i) : src;
        const elements = this.el.nativeElement.querySelectorAll(`[href]`);
        for (const elem of elements) {
            const href = elem.getAttribute('href');
            const index = search.indexOf(href);
            if (index === 0) {
                this.isActive = true;
                break;
            } else {
                this.isActive = false;
            }
        }
        this.isOpen = this.isOpen || this.isActive;
    }

    ngOnInit(): void {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: RouterEvent) => {
            // oh i'm not really sure if it is a good way
            // but it is the only and simplest I can afford today -_-
            this.checkIsActive(e['urlAfterRedirects']);
        });
    }

    ngAfterContentInit(): void {
        let parent = this.el.nativeElement.parentElement.closest('sdk-nav-menu-group');
        while (parent) {
            this.deepLvl++;
            parent = parent.parentElement.closest('sdk-nav-menu-group');
        }

        this.checkIsActive(this.router.url);
    }
}
