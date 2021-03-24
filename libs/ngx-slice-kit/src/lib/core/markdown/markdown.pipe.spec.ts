import { MarkdownPipe } from './markdown.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import {TestBed} from '@angular/core/testing';
import {I17rService} from '../i17r/i17r.service';

describe('MarkdownPipe', () => {
    let sanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                I17rService,
            ]
        });
        sanitizer = TestBed.inject(DomSanitizer);
    });

    it('create an instance', () => {
        const pipe = new MarkdownPipe(
            sanitizer,
        );
        expect(pipe).toBeTruthy();
    });

    it('should', () => {
        const pipe = new MarkdownPipe(
            sanitizer,
        );

        expect(pipe.transform('test')).toEqual(sanitizer.bypassSecurityTrustHtml('test'));
    });
});
