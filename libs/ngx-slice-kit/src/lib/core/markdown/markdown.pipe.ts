import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

    constructor(
        private sanitizer: DomSanitizer
    ) {
    }

    public transform(value: string, ...args: any[]): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }

}
