import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    QueryList,
    ViewChild
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TabComponent } from '../tabs/tab/tab.component';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
    template: '',
    styleUrls: ['./tabs-group.component.css']
})
export class TabsGroupComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
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
        // Released in child classes
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
