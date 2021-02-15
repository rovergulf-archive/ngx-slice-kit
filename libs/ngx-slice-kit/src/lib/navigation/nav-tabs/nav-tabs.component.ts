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
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { delay, throttleTime } from 'rxjs/operators';
import { ThemeService } from '../../core/theme/theme.service';
import { slideInAnimation } from '../../core/animations/slide-in';
import { TabLinkDirective } from './tab-link.directive';

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

    @ViewChild('parent', {static: true}) parentElement;
    @ViewChild('tabs', {static: true}) tabsContainer;
    @ViewChild('arrowLeft', {static: true}) arrowLeft;
    @ViewChild('arrowRight', {static: true}) arrowRight;

    subscription: Subscription = new Subscription();

    tabsViewElements: HTMLElement[];
    curTab: HTMLElement;
    tabGroup: TabLinkDirective[] = [];
    container: HTMLElement;
    containerWidth: number;
    tabsWrapperWidth: number;
    allTabsWidth: number = 0;
    arrowWidth: number = 40;
    isArrows: boolean;
    tabsScrollRect;
    curTabClientRect;
    containerRect;

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
    ) { }

    selectTab(src = null, index: string = ''): void {
        if (src && index) {
            this.pageState = index;
            this.router.navigate([`${src}`], {relativeTo: this.route});
        }

        setTimeout(() => {
            this.curTab = this.container.querySelector(`.sdk-tab-container__tab--active`);
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
        let x = this.tabsContainer.nativeElement.style.left || 0;
        const defaultStep = this.containerRect.width / 100 * 30;
        let scrollStep = defaultStep;
        this.tabsScrollRect = this.tabsContainer.nativeElement.getBoundingClientRect();

        if (this.tabsScrollRect.right - scrollStep < this.containerRect.right + this.arrowWidth) {
            scrollStep = (this.tabsScrollRect.right - this.containerRect.right) + this.arrowWidth;
            x = parseInt(x, 10) - scrollStep;
        } else {
            scrollStep = step ? step : defaultStep;
            x = parseInt(x, 10) - scrollStep;
        }

        this.slideMeasure.left = `${parseInt(this.slideMeasure.left, 10) - scrollStep}px`;
        this.moveContainer(x);
    }

    scrollLeft(step = null): void {
        let x = this.tabsContainer.nativeElement.style.left || 0;
        const defaultStep = this.containerRect.width / 100 * 30;
        let scrollStep = defaultStep;
        this.tabsScrollRect = this.tabsContainer.nativeElement.getBoundingClientRect();

        if (this.tabsScrollRect.left + scrollStep > this.containerRect.left + this.arrowWidth) {
            scrollStep = this.containerRect.left - (this.tabsScrollRect.left - this.arrowWidth);
            x = 0;
        } else {
            scrollStep = step ? step : defaultStep;
            x = parseInt(x, 10) + scrollStep;
        }

        this.slideMeasure.left = `${parseInt(this.slideMeasure.left, 10) + scrollStep}px`;
        this.moveContainer(x);
    }

    moveContainer(x): void {
        this.tabsContainer.nativeElement.style.left = x + 'px';
        this.containerPosition$.next(true);
    }

    setUnderlineMeasure(): void {
        this.curTabClientRect = this.curTab.getBoundingClientRect();
        this.slideMeasure.width = `${this.curTabClientRect.width}px`;
        this.slideMeasure.left = `${this.curTabClientRect.x - this.containerRect.x - (this.isArrows ? this.arrowWidth : 0)}px`;
    }

    setContainerSizes(): void {
        this.containerRect = this.container.getBoundingClientRect();
        this.containerWidth = this.containerRect.width;
        this.tabsWrapperWidth = this.containerWidth - (this.arrowWidth * 2);
    }

    setTabSizes(): void {
        this.tabsViewElements.forEach(tab => {
            const tabWidth = tab.getBoundingClientRect().width;
            this.allTabsWidth += tabWidth;
            if (tabWidth > this.tabsWrapperWidth) {
                tab.classList.add('sdk-tab-container__tab--oversize');
            }
        });

        this.tabsScrollRect = this.tabsContainer.nativeElement.getBoundingClientRect();
    }

    changeRects(): void {
        this.tabsScrollRect = this.tabsContainer.nativeElement.getBoundingClientRect();
        this.curTabClientRect = this.curTab.getBoundingClientRect();
    }

    ngOnInit(): void {
        this.container = this.parentElement.nativeElement;
        this.setContainerSizes();

        this.subscription = this.containerPosition$.pipe(delay(400)).subscribe(() => this.changeRects());

        const subResize = fromEvent(window, 'resize')
            .subscribe(() => {
                this.setContainerSizes();
                this.isArrows = this.allTabsWidth > this.containerWidth;
                if (!this.isArrows) {
                    const x = Math.abs(parseFloat(this.tabsContainer.nativeElement.style.left)) || 0;
                    this.tabsContainer.nativeElement.style.left = 0 + 'px';
                    if (x !== 0) {
                        this.slideMeasure.left = parseFloat(this.slideMeasure.left) + x + 'px';
                    }
                }
            });
        const subRightArrow = fromEvent(this.arrowRight.nativeElement, 'click')
            .pipe(throttleTime(500))
            .subscribe(() => {
                this.scrollRight();
            });
        const subLeftArrow = fromEvent(this.arrowLeft.nativeElement, 'click')
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
        this.tabsViewElements = Array.from(this.tabsContainer.nativeElement.children);
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
