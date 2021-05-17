import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    OnInit,
    QueryList,
    ViewChild,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { ThemeService } from '../../core/theme/theme.service';
import { fromEvent } from 'rxjs';
import { delay, throttleTime } from 'rxjs/operators';
import { TabsGroupComponent } from '../tabs-group/tabs-group.component';

@Component({
    selector: 'sdk-tab-group',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent extends TabsGroupComponent implements AfterContentInit {

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    tabGroup: TabComponent[] = [];

    @ViewChild('container', {static: true}) containerElement;
    @ViewChild('tabs', {static: true}) tabsWrapperElement;
    @ViewChild('arrowLeft', {static: true}) arrowLeftElement;
    @ViewChild('arrowRight', {static: true}) arrowRightElement;

    constructor(
        public themeService: ThemeService,
        protected cdRef: ChangeDetectorRef
    ) {
        super(themeService, cdRef);
    }

    selectTab(selectedTab, index): any {
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

    ngAfterContentInit(): void {
        this.tabGroup = [];
        this.tabs.forEach(tabInstance => this.tabGroup.push(tabInstance));
        this.selectTab(this.tabs.first, 0);

        this.tabs.changes.subscribe(res => {
            this.tabGroup = [];
            res.forEach(tabInstance => this.tabGroup.push(tabInstance));
        });

        this.cdRef.detectChanges();
    }
}
