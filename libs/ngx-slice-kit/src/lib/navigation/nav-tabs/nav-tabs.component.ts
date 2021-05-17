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

export class NavTabsComponent extends TabsGroupComponent implements AfterContentInit {

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

    setSubscriptions(): void {
        super.setSubscriptions();
        const subRouter = this.router.events
            .pipe(
                filter((event: NavigationEnd) => event instanceof NavigationEnd)
            )
            .subscribe(() => {
                this.selectTab();
            });

        this.subscription.add(subRouter);
    }

    getRouteAnimation(outlet: RouterOutlet): number {
        return outlet.activatedRouteData.index === undefined ? -1 : outlet.activatedRouteData.index;
    }

    ngAfterContentInit(): void {
        this.tabGroup = [];
        this.tabs.forEach(tabInstance => this.tabGroup.push(tabInstance));
        this.selectTab();
    }
}
