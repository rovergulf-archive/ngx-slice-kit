import { Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { GLYPHS } from './icon.glyphs';

@Injectable({
    providedIn: 'root'
})
export class IconService {

    public isBrowser: boolean;

    constructor(
        // eslint-disable-next-line @typescript-eslint/ban-types
        @Inject(PLATFORM_ID) private platformId: Object,
        private renderer: Renderer2,
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public addIconToSet(icon: { code: string, name: string }): void {
        // TODO workaround this one -> GLYPHS.push()
    }

    public createIcon(icon: string): any {
        if (!this.isBrowser) {
            console.log('Not enabled for server platform');
            return;
        }

        if (GLYPHS.hasOwnProperty(icon)) {

        }
    }

    public getIcon(icon: string): SafeHtml {
        return this.createIcon(icon);
    }

    // TODO renderIcon v2+

}
