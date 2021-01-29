import { Pipe, PipeTransform } from '@angular/core';

import { I17rService } from './i17r.service';

@Pipe({
    name: 'i17r'
})
export class I17rPipe implements PipeTransform {

    constructor(
        private i17r: I17rService,
    ) {
    }

    transform(value: string, lang?: string): string {
        if (!lang || !lang.length) {
            lang = this.i17r.currentLang;
        }

        console.log(`[I17rPipe] current value: ${value}; language: ${lang}`);

        return '';
    }

}
