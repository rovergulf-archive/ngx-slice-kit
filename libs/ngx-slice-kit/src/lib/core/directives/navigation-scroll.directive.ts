import { Directive, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from "@angular/common";

@Directive({
    selector: '[sdkNavigationScroll]'
})
export class NavigationScrollDirective implements OnInit, OnDestroy {

    private sub: Subscription;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private elementRef: ElementRef,
        private router: Router
    ) {
    }

    initNavSub() {
        /**
         * Init router event subscription
         */
        this.elementRef.nativeElement.style['scroll-behavior'] = 'smooth';
        this.sub = this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                this.elementRef.nativeElement.scrollTop = 0;
            }
        });
    }


    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initNavSub();
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
