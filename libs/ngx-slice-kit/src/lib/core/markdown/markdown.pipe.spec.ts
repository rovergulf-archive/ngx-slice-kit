import { MarkdownPipe } from './markdown.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('MarkdownPipe', () => {
    it('create an instance', () => {
        let sanitizer: DomSanitizer;
        const pipe = new MarkdownPipe(
            sanitizer,
        );
        expect(pipe).toBeTruthy();
    });
});
