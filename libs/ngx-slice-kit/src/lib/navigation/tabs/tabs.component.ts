import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren, OnInit,
    QueryList,
    ViewChild,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { ThemeService } from '../../core/theme/theme.service';
import { TabsGroupComponent } from '../tabs-group/tabs-group.component';

@Component({
    selector: 'sdk-tab-group',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent extends TabsGroupComponent implements OnInit, AfterContentInit {

    @ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;
    public tabGroup: TabComponent[] = [];

    @ViewChild('container', {static: true}) public containerElement;
    @ViewChild('tabs', {static: true}) public tabsWrapperElement;
    @ViewChild('arrowLeft', {static: true}) public arrowLeftElement;
    @ViewChild('arrowRight', {static: true}) public arrowRightElement;

    constructor(
        public themeService: ThemeService,
        protected cdRef: ChangeDetectorRef
    ) {
        super(themeService, cdRef);
    }

    public selectTab(selectedTab, index): any {
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

        super.selectTab();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public ngAfterContentInit(): void {
        this.tabGroup = [];
        this.tabs.forEach(tabInstance => this.tabGroup.push(tabInstance));
        this.selectTab(this.tabs.first, 0);

        this.tabs.changes.subscribe(res => {
            this.tabGroup = [];
            res.forEach(tabInstance => this.tabGroup.push(tabInstance));
        });


    }
}
