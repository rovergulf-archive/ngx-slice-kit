import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy, OnInit,
    QueryList,
    ViewChild
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { TabComponent } from '../tabs/tab/tab.component';
import { ThemeService } from '../../core/theme/theme.service';
import { delay, throttleTime } from 'rxjs/operators';

@Component({
    template: '',
    styleUrls: ['./tabs-group.component.css']
})
export class TabsGroupComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    tabs: QueryList<any>;

    @Input() activeTabStyle: string = 'border';
    @Input() animation: boolean = false;

    @ViewChild('container', {static: true}) containerElement;
    @ViewChild('tabs', {static: true}) tabsWrapperElement;
    @ViewChild('arrowLeft', {static: true}) arrowLeftElement;
    @ViewChild('arrowRight', {static: true}) arrowRightElement;

    subscription: Subscription = new Subscription();

    tabsViewElements: HTMLElement[];
    curTab: HTMLElement;
    tabGroup: any[] = [];
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

    constructor(
        public themeService: ThemeService,
        protected cdRef: ChangeDetectorRef
    ) {
    }


    selectTab(selectedTab, index): any {
        // Implemented in child classes
    }

    scrollRight(step = null): void {
        let x: number = parseInt(this.tabsWrapperElement.style.left, 10) || 0;
        const defaultStep = this.containerRect.width / 100 * 30;
        let scrollStep = defaultStep;
        this.tabsScrollRect = this.tabsWrapperElement.getBoundingClientRect();

        if (this.tabsScrollRect.right - scrollStep < this.containerRect.right + this.arrowWidth) {
            scrollStep = (this.tabsScrollRect.right - this.containerRect.right) + this.arrowWidth;
        } else {
            scrollStep = step ? step : defaultStep;
        }

        x -= scrollStep;

        this.moveContainer(x);
    }

    scrollLeft(step = null): void {
        let x: number = parseInt(this.tabsWrapperElement.style.left, 10) || 0;
        const defaultStep = this.containerRect.width / 100 * 30;
        let scrollStep = defaultStep;
        this.tabsScrollRect = this.tabsWrapperElement.getBoundingClientRect();

        if (this.tabsScrollRect.left + scrollStep > this.containerRect.left + this.arrowWidth) {
            x = 0;
        } else {
            scrollStep = step ? step : defaultStep;
            x += scrollStep;
        }

        this.moveContainer(x);
    }

    moveContainer(x): void {
        let newX: number = x;
        if (Math.abs(x) + this.containerWidth - (this.arrowLeftElement.offsetWidth * 2) > this.allTabsWidth) {
            newX = this.containerWidth - (this.arrowLeftElement.offsetWidth * 2) - this.allTabsWidth;
        }
        this.tabsWrapperElement.style.left = newX + 'px';
        this.containerPosition$.next(true);
    }

    setUnderlineMeasure(): void {
        this.curTabClientRect = this.curTab.getBoundingClientRect();
        this.slideMeasure.width = `${this.curTabClientRect.width}px`;
        this.slideMeasure.left = `${this.curTab.offsetLeft}px`;
    }

    setSizes(): void {
        this.containerRect = this.containerElement.getBoundingClientRect();
        this.containerWidth = this.containerRect.width;
        this.tabsWrapperWidth = this.containerWidth - (this.isArrows ? (this.arrowWidth * 2) : 0);
    }

    setTabSizes(): void {
        this.allTabsWidth = 0;
        this.tabsViewElements.forEach(tab => {
            const tabWidth = tab.offsetWidth;
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

    setSubscriptions(): void {
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

    setSpecialSubscriptions(): void {
        // Implemented in child classes
    }

    ngOnInit(): void {
        this.containerElement = this.containerElement.nativeElement || this.containerElement;
        this.tabsWrapperElement = this.tabsWrapperElement.nativeElement || this.tabsWrapperElement;
        this.arrowLeftElement = this.arrowLeftElement.nativeElement || this.arrowLeftElement;
        this.arrowRightElement = this.arrowRightElement.nativeElement || this.arrowRightElement;
        this.setSizes();
        this.setSubscriptions();
        this.setSpecialSubscriptions();
    }


    ngAfterViewInit(): void {
        console.log(this.tabs, this.tabs.first instanceof TabComponent, 'tabs');
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
