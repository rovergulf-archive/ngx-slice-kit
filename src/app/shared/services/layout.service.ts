import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LayoutControlService, ThemeService } from 'ngx-slice-kit';
import { CookieService } from 'ngx-cookie';

const DEFAULT_THEME_NAME = 'light';
const DARK_THEME_NAME = 'dark';
export type AvailableThemes = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private $cookieName: BehaviorSubject<string> = new BehaviorSubject<string>('sdk-theme');
    private $mobileLayout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private $sidenavOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private $themeName: BehaviorSubject<string> = new BehaviorSubject<string>(this.getDefaultThemeName());

    get cookieName(): string {
        return this.$cookieName.getValue();
    }

    set cookieName(n: string) {
        this.$cookieName.next(n);
    }

    get mobileLayout(): boolean {
        return this.$mobileLayout.getValue();
    }

    set mobileLayout(state: boolean) {
        this.$mobileLayout.next(state);
    }

    get sidenavOpened(): boolean {
        return this.$sidenavOpened.getValue();
    }

    set sidenavOpened(state: boolean) {
        this.$sidenavOpened.next(state);
    }

    get themeName(): any {
        return this.$themeName.getValue();
    }

    set themeName(t: any) {
        this.cookieService.put(this.cookieName, t);

        this.themeService.setTheme(t);
        this.$themeName.next(t);
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private layoutControl: LayoutControlService,
        private themeService: ThemeService,
        private cookieService: CookieService
    ) {
    }

    getDefaultThemeName(): any {
        const saved = this.cookieService.get(this.cookieName);
        return saved ?? DEFAULT_THEME_NAME;
    }

    public toggleSidenav(): void {
        this.sidenavOpened = !this.sidenavOpened;
    }

    public hideSidenav(): void {
        this.sidenavOpened = false;
    }

    public toggleTheme(): void {
        this.themeName = this.themeName === 'light' ? 'dark' : 'light';
    }

    public setTheme(t: string): void {
        this.themeName = t;
    }

    public registerService(serviceName: string): void {
        this.cookieName = `${serviceName}-theme`;
    }

    nextTheme(): void {
    }

}
