import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';
import {delay, throttleTime} from 'rxjs/operators';
import {ThemeService} from '../../core/theme/theme.service';
import {slideInAnimation} from '../../core/animations/slide-in';
import {TabLinkDirective} from './tab-link.directive';

@Component({
    selector: 'sdk-nav-tab-group',
    templateUrl: './nav-tabs.component.html',
    styleUrls: ['./nav-tabs.component.scss'],
    animations: [
        slideInAnimation
    ]
})
export class NavTabsComponent implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {

    @ContentChildren(TabLinkDirective) linkTabs!: QueryList<TabLinkDirective>;

    @Input() activeTabStyle: string = 'border';
    @Input() animation: boolean = false;

    @ViewChild('parent', {static: true}) containerElement;
    @ViewChild('tabs', {static: true}) tabsWrapperElement;
    @ViewChild('arrowLeft', {static: true}) arrowLeftElement;
    @ViewChild('arrowRight', {static: true}) arrowRightElement;

    subscription: Subscription = new Subscription();

    tabsViewElements: HTMLElement[];
    curTab: HTMLElement;
    tabGroup: TabLinkDirective[] = [];
    containerWidth: number;
    tabsWrapperWidth: number;
    allTabsWidth: number = 0;
    arrowWidth: number = 40;
    isArrows: boolean;
    tabsScrollRect: ClientRect;
    curTabClientRect: ClientRect;
    containerRect: ClientRect;

    containerPosition$ = new BehaviorSubject(null);

    slideMeasure: { width: any, left: any } = {
        width: 0,
        left: 0
    };

    pageState;

    constructor(
        public themeService: ThemeService,
        private cdRef: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    selectTab(src = null, index: number = -1): void {
        if (src && (index > -1)) {
            this.pageState = index;
            this.router.navigate([`${src}`], {relativeTo: this.route});
        }

        setTimeout(() => {
            this.curTab = this.containerElement.querySelector(`.sdk-tab-container__tab--active`);
            this.setUnderlineMeasure();

            // if current element not fully visible
            if (this.isArrows) {
                if (this.curTabClientRect.left - this.arrowWidth < this.containerRect.left) {
                    const visiblePart = this.curTabClientRect.right - this.arrowWidth - this.containerRect.left;
                    const hiddenPart = this.curTabClientRect.width - visiblePart;
                    const additionalPadding = 40;
                    this.scrollLeft(hiddenPart + additionalPadding);
                }
                if (this.curTabClientRect.right + this.arrowWidth > this.containerRect.right) {
                    const visiblePart = this.containerRect.right - this.arrowWidth - this.curTabClientRect.left;
                    const hiddenPart = this.curTabClientRect.width - visiblePart;
                    const additionalPadding = 40;
                    this.scrollRight(hiddenPart + additionalPadding);
                }
            }
            if (!index) {
                this.pageState = `${this.curTab.tabIndex}`;
            }
        });
    }

    scrollRight(step = null): void {
        let x: number = parseInt(this.tabsWrapperElement.style.left, 10) || 0;
        const defaultStep = this.containerRect.width / 100 * 30;
        let scrollStep = defaultStep;
        this.tabsScrollRect = this.tabsWrapperElement.getBoundingClientRect();

        if (this.tabsScrollRect.right - scrollStep < this.containerRect.right + this.arrowWidth) {
            scrollStep = (this.tabsScrollRect.right - this.containerRect.right) + this.arrowWidth;
            x -= scrollStep;
        } else {
            scrollStep = step ? step : defaultStep;
            x -= scrollStep;
        }

        this.slideMeasure.left = `${parseInt(this.slideMeasure.left, 10) - scrollStep}px`;
        this.moveContainer(x);
    }

    scrollLeft(step = null): void {
        let x: number = parseInt(this.tabsWrapperElement.style.left, 10) || 0;
        const defaultStep = this.containerRect.width / 100 * 30;
        let scrollStep = defaultStep;
        this.tabsScrollRect = this.tabsWrapperElement.getBoundingClientRect();

        if (this.tabsScrollRect.left + scrollStep > this.containerRect.left + this.arrowWidth) {
            scrollStep = this.containerRect.left - (this.tabsScrollRect.left - this.arrowWidth);
            x = 0;
        } else {
            scrollStep = step ? step : defaultStep;
            x += scrollStep;
        }

        this.slideMeasure.left = `${parseInt(this.slideMeasure.left, 10) + scrollStep}px`;
        this.moveContainer(x);
    }

    moveContainer(x): void {
        this.tabsWrapperElement.style.left = x + 'px';
        this.containerPosition$.next(true);
    }

    setUnderlineMeasure(): void {
        this.curTabClientRect = this.curTab.getBoundingClientRect();
        this.slideMeasure.width = `${this.curTabClientRect.width}px`;
        this.slideMeasure.left = `${this.curTabClientRect.left - this.containerRect.left - (this.isArrows ? this.arrowWidth : 0)}px`;
    }

    setContainerSizes(): void {
        this.containerRect = this.containerElement.getBoundingClientRect();
        this.containerWidth = this.containerRect.width;
        this.tabsWrapperWidth = this.containerWidth - (this.isArrows ? (this.arrowWidth * 2) : 0);
    }

    setTabSizes(): void {
        this.tabsViewElements.forEach(tab => {
            const tabWidth = tab.getBoundingClientRect().width;
            this.allTabsWidth += tabWidth;
            if (tabWidth > this.tabsWrapperWidth) {
                tab.classList.add('sdk-tab-container__tab--oversize');
            }
        });

        this.tabsScrollRect = this.tabsWrapperElement.getBoundingClientRect();
    }

    changeRects(): void {
        this.tabsScrollRect = this.tabsWrapperElement.getBoundingClientRect();
        this.curTabClientRect = this.curTab.getBoundingClientRect();
    }

    ngOnInit(): void {
        this.containerElement = this.containerElement.nativeElement;
        this.tabsWrapperElement = this.tabsWrapperElement.nativeElement;
        this.arrowLeftElement = this.arrowLeftElement.nativeElement;
        this.arrowRightElement = this.arrowRightElement.nativeElement;
        this.setContainerSizes();

        console.dir({
            containerRect: this.containerRect,
            containerWidth: this.containerWidth,
            tabsWrapperWidth: this.tabsWrapperWidth,
            arrowWidth: this.arrowWidth
        });

        this.subscription = this.containerPosition$.pipe(delay(400)).subscribe(() => this.changeRects());

        const subResize = fromEvent(window, 'resize')
            .subscribe(() => {
                this.setContainerSizes();
                this.isArrows = this.allTabsWidth > this.containerWidth;
                if (!this.isArrows) {
                    const x = Math.abs(parseFloat(this.tabsWrapperElement.style.left)) || 0;
                    this.tabsWrapperElement.style.left = 0 + 'px';
                    if (x !== 0) {
                        this.slideMeasure.left = parseFloat(this.slideMeasure.left) + x + 'px';
                    }
                }
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
        this.subscription.add(subRightArrow);
        this.subscription.add(subLeftArrow);
    }

    ngAfterContentInit(): void {
        this.linkTabs.forEach(tabInstance => this.tabGroup.push(tabInstance));
        this.selectTab();
    }

    ngAfterViewInit(): void {
        this.tabsViewElements = Array.from(this.tabsWrapperElement.children);
        this.setTabSizes();
        this.isArrows = this.allTabsWidth > this.containerWidth;
    }

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
