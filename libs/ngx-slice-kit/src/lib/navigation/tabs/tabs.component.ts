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
    ViewChild,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { ThemeService } from '../../core/theme/theme.service';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { delay, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'sdk-tab-group',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    @Input() activeTabStyle: string = 'border';
    @Input() animation: boolean = false;

    @ViewChild('container', {static: true}) container;
    @ViewChild('tabs', {static: true}) tabsContainer;
    @ViewChild('arrowLeft', {static: true}) arrowLeft;
    @ViewChild('arrowRight', {static: true}) arrowRight;

    subscription: Subscription = new Subscription();

    tabGroup: TabComponent[] = [];
    curTab: HTMLElement;
    containerElement: HTMLElement;
    curTabClientRect;
    containerRect;
    tabsScrollRect;
    tabsViewElements: HTMLElement[];
    containerWidth: number;
    tabsWrapperWidth: number;
    allTabsWidth: number = 0;
    arrowWidth: number = 40;
    isArrows: boolean;

    containerPosition$ = new BehaviorSubject(null);

    slideMeasure: { width: any, left: any } = {
        width: 0,
        left: 0
    };

    constructor(
        public themeService: ThemeService,
        private cdRef: ChangeDetectorRef
    ) {}

    selectTab(selectedTab, index) {
        if (selectedTab.active) {
            return;
        }

        // set prev tab "hiding" stat and start hide animation for it
        selectedTab.index = index;
        let prevTabIndex: number;
        for (const tab of this.tabGroup) {
            if (tab.active) {
                tab.hiding = true;
                prevTabIndex = tab.index;
                if (this.animation) {
                    tab.slideDirection = tab.index > index ? 'slideRight' : 'slideLeft';
                }
                setTimeout(() => {
                    tab.hiding = false;
                }, this.animation ? 500 : 0);
            }
            tab.active = false;
        }

        // set new active tab and start show animation
        selectedTab.active = true;
        if (this.animation) {
            selectedTab.slideDirection = selectedTab.index > prevTabIndex ? 'slideLeft' : 'slideRight';
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

    moveContainer(x) {
        this.tabsContainer.nativeElement.style.left = x + 'px';
        this.containerPosition$.next(true);
    }

    changeRects() {
        this.tabsScrollRect = this.tabsContainer.nativeElement.getBoundingClientRect();
        this.curTabClientRect = this.curTab.getBoundingClientRect();
    }

    setContainerSizes(): void {
        this.containerRect = this.containerElement.getBoundingClientRect();
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

    setUnderlineMeasure() {
        // this.curTabClientRect = this.curTab.getBoundingClientRect();
        this.slideMeasure.width = `${this.curTab.offsetWidth}px`;
        const tabsContainerOffset = (parseFloat(this.tabsContainer.nativeElement.style.left) || 0);
        // this.slideMeasure.left = `${this.curTabClientRect.x - this.containerRect.x - (this.isArrows ? this.arrowWidth : 0)}px`;
        this.slideMeasure.left = `${this.curTab.offsetLeft + tabsContainerOffset}px`;

        console.log(this.slideMeasure, parseFloat(this.tabsContainer.nativeElement.style.left) || 0, 'rect');
    }

    ngOnInit(): void {
        this.containerElement = this.container.nativeElement;
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
        this.tabs.forEach(tabInstance => this.tabGroup.push(tabInstance));
        console.log(this.tabGroup, 'dis ins')
        this.selectTab(this.tabs.first, 0);
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
