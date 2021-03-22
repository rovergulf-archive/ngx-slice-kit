import { I17rPipe } from './i17r.pipe';
import { I17rService } from './i17r.service';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('I17rPipe', () => {
    let service: I17rService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // imports: [RouterTestingModule],
            providers: [
                I17rService,
            ]
        });
        service = TestBed.inject(I17rService);
    });

    it('create an instance', () => {
        const pipe = new I17rPipe(
            service
        );
        expect(pipe).toBeTruthy();
    });
});
