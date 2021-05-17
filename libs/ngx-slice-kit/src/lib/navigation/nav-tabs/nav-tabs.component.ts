import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    OnInit,
    QueryList,
    ViewChild
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fromEvent } from 'rxjs';
import { delay, filter, throttleTime } from 'rxjs/operators';
import { ThemeService } from '../../core/theme/theme.service';
import { slideInAnimation } from '../../core/animations/slide-in';
import { TabLinkDirective } from './tab-link.directive';
import { TabsGroupComponent } from '../tabs-group/tabs-group.component';

@Component({
    selector: 'sdk-nav-tab-group',
    templateUrl: './nav-tabs.component.html',
    styleUrls: ['./nav-tabs.component.scss'],
    animations: [
        slideInAnimation
    ]
})

export class NavTabsComponent extends TabsGroupComponent implements OnInit, AfterContentInit {

    @ContentChildren(TabLinkDirective) tabs!: QueryList<TabLinkDirective>;
    tabGroup: TabLinkDirective[] = [];

    @ViewChild('parent', {static: true}) containerElement;
    @ViewChild('tabs', {static: true}) tabsWrapperElement;
    @ViewChild('arrowLeft', {static: true}) arrowLeftElement;
    @ViewChild('arrowRight', {static: true}) arrowRightElement;

    constructor(
        public themeService: ThemeService,
        protected cdRef: ChangeDetectorRef,
        private router: Router,
    ) {
        super(themeService, cdRef);
    }

    selectTab(): void {
        setTimeout(() => {
            this.curTab = this.containerElement.querySelector(`.sdk-tab-container__tab--active`);
            this.curTabClientRect = this.curTab.getBoundingClientRect();

            // if current element not fully visible
            if (this.isArrows) {
                if ((this.curTabClientRect.left - this.arrowWidth) < this.containerRect.left) {
                    const visiblePart = this.curTabClientRect.right - this.arrowWidth - this.containerRect.left;
                    const hiddenPart = this.curTabClientRect.width - visiblePart;
                    const additionalPadding = 40;
                    this.scrollLeft(hiddenPart + additionalPadding);
                }
                if ((this.curTabClientRect.right + this.arrowWidth) > this.containerRect.right) {
                    const visiblePart = this.containerRect.right - this.arrowWidth - this.curTabClientRect.left;
                    const hiddenPart = this.curTabClientRect.width - visiblePart;
                    const additionalPadding = 40;
                    this.scrollRight(hiddenPart + additionalPadding);
                }
            }
            this.setUnderlineMeasure();
        });
    }

    getRouteAnimation(outlet: RouterOutlet): number {
        return outlet.activatedRouteData.index === undefined ? -1 : outlet.activatedRouteData.index;
    }

    ngOnInit(): void {
        this.containerElement = this.containerElement.nativeElement || this.containerElement;
        this.tabsWrapperElement = this.tabsWrapperElement.nativeElement || this.tabsWrapperElement;
        this.arrowLeftElement = this.arrowLeftElement.nativeElement || this.arrowLeftElement;
        this.arrowRightElement = this.arrowRightElement.nativeElement || this.arrowRightElement;
        this.setSizes();

        this.subscription = this.containerPosition$.pipe(delay(400)).subscribe(() => this.changeRects());

        const subResize = fromEvent(window, 'resize')
            .subscribe(() => {
                this.setSizes();
                this.isArrows = this.allTabsWidth > this.containerWidth;
                if (!this.isArrows) {
                    const x = Math.abs(parseFloat(this.tabsWrapperElement.style.left)) || 0;
                    this.tabsWrapperElement.style.left = '0px';
                    if (x !== 0) {
                        this.slideMeasure.left = `${parseFloat(this.slideMeasure.left) + x}px`;
                    }
                }
            });
        const subRouter = this.router.events
            .pipe(
                filter((event: NavigationEnd) => event instanceof NavigationEnd)
            )
            .subscribe(() => {
                this.selectTab();
            });
        const subRightArrow = fromEvent(this.arrowRightElement, 'click')
            .pipe(throttleTime(500))
            .subscribe(() => {
                this.scrollRight();
            });
        const subLeftArrow = fromEvent(this.arrowLeftElement, 'click')
            .pipe(throttleTime(500))
            .subscribe(() => {
                this.scrollLeft();
            });

        this.subscription.add(subResize);
        this.subscription.add(subRouter);
        this.subscription.add(subRightArrow);
        this.subscription.add(subLeftArrow);
    }

    ngAfterContentInit(): void {
        this.tabGroup = [];
        this.tabs.forEach(tabInstance => this.tabGroup.push(tabInstance));
        this.selectTab();
    }
}
