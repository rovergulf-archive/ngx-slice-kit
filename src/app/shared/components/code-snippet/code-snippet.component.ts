import { Component, Input } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'lib-code-snippet',
    templateUrl: './code-snippet.component.html',
    styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent {

    @Input() value: string;
    copied: boolean;

    constructor() {
    }

    copyToClipboard(val: string): void {
        if (!navigator.clipboard) {
            console.error('Navigator clipboard is not available');
            return;
        }

        navigator.clipboard.writeText(val).then(() => {
            this.copied = true;
            timer(500).subscribe(() => this.copied = false);
            // console.log('Async: Copying to clipboard was successful!');
        }, err => {
            console.error('Async: Could not copy text: ', err);
        });
    }

}
