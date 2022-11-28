import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input,
    OnDestroy, OnInit, Output,
    QueryList,
    ViewChild
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { ThemeService } from '../../core/theme/theme.service';
import { delay, throttleTime } from 'rxjs/operators';
import { slideInAnimation } from '../../core/animations/slide-in';

@Component({
    template: '',
    styleUrls: ['./tabs-group.component.scss'],
    animations: [
        slideInAnimation
    ]
})
export class TabsGroupComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    public tabs: QueryList<any>;

    @Input() public activeTabStyle: string = 'border';
    @Input() public animation: boolean = false;
    @Output() public activeIndex: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('container', {static: true}) public containerElement;
    @ViewChild('tabs', {static: true}) public tabsWrapperElement;
    @ViewChild('arrowLeft', {static: true}) public arrowLeftElement;
    @ViewChild('arrowRight', {static: true}) public arrowRightElement;

    public subscription: Subscription = new Subscription();

    public tabsViewElements: HTMLElement[];
    public curTab: HTMLElement;
    public tabGroup: any[] = [];
    public containerWidth: number;
    public tabsWrapperWidth: number;
    public allTabsWidth: number = 0;
    public arrowWidth: number = 40;
    public isArrows: boolean;
    public tabsScrollRect: ClientRect;
    public curTabClientRect: ClientRect;
    public containerRect: ClientRect;

    public containerPosition$ = new BehaviorSubject(null);

    public slideMeasure: { width: any, left: any } = {
        width: 0,
        left: 0
    };

    constructor(
        public themeService: ThemeService,
        protected cdRef: ChangeDetectorRef
    ) {
    }


    public selectTab(selectedTab = null, index = null): void {
        setTimeout(() => {
            this.curTab = this.containerElement.querySelector(`.sdk-tab-container__tab--active`);
            this.curTabClientRect = this.curTab.getBoundingClientRect();
            this.activeIndex.emit(index);

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

    public scrollRight(step = null): void {
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

    public scrollLeft(step = null): void {
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

    public moveContainer(x): void {
        let newX: number = x;
        if (Math.abs(x) + this.containerWidth - (this.arrowLeftElement.offsetWidth * 2) > this.allTabsWidth) {
            newX = this.containerWidth - (this.arrowLeftElement.offsetWidth * 2) - this.allTabsWidth;
        }
        this.tabsWrapperElement.style.left = newX + 'px';
        this.containerPosition$.next(true);
    }

    public setUnderlineMeasure(): void {
        this.curTabClientRect = this.curTab.getBoundingClientRect();
        this.slideMeasure.width = `${this.curTabClientRect.width}px`;
        this.slideMeasure.left = `${this.curTab.offsetLeft}px`;
    }

    public setSizes(): void {
        this.containerRect = this.containerElement.getBoundingClientRect();
        this.containerWidth = this.containerRect.width;
        this.tabsWrapperWidth = this.containerWidth - (this.isArrows ? (this.arrowWidth * 2) : 0);
    }

    public setTabSizes(): void {
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

    public changeRects(): void {
        this.tabsScrollRect = this.tabsWrapperElement.getBoundingClientRect();
        this.curTabClientRect = this.curTab.getBoundingClientRect();
    }

    public setSubscriptions(): void {
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

    public ngOnInit(): void {
        this.containerElement = this.containerElement.nativeElement || this.containerElement;
        this.tabsWrapperElement = this.tabsWrapperElement.nativeElement || this.tabsWrapperElement;
        this.arrowLeftElement = this.arrowLeftElement.nativeElement || this.arrowLeftElement;
        this.arrowRightElement = this.arrowRightElement.nativeElement || this.arrowRightElement;
        this.setSizes();
        this.setSubscriptions();
    }


    public ngAfterViewInit(): void {
        this.tabsViewElements = Array.from(this.tabsWrapperElement.children);
        this.setTabSizes();
        this.isArrows = this.allTabsWidth > this.containerWidth;
    }

    public ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
