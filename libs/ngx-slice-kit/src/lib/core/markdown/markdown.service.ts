import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MarkdownService {

    constructor(
        private sanitizer: DomSanitizer
    ) {
    }

    public test(str: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(str);
    }
}
