import { NavigationScrollDirective } from './navigation-scroll.directive';
import { ElementRef, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavigationScrollDirective', () => {
    const UNIX_PLATFORM_ID = 4;
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    let service: NavigationScrollDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                NavigationScrollDirective,
                {provide: ElementRef, useValue: new MockElementRef()},
                {provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID},
            ]
        });
    });

    describe('with PLATFORM_ID as server', () => {
        beforeEach(() => {
            service = TestBed.inject(NavigationScrollDirective);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should #initNavSub not be called if platform id is not browser', () => {
            spyOn(service, 'initNavSub');
            service.ngOnInit();
            expect(service.initNavSub).not.toHaveBeenCalled();
        });
    });

    describe('with PLATFORM_ID as browser', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: PLATFORM_BROWSER_ID});
            service = TestBed.inject(NavigationScrollDirective);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should #initNavSub be called if platform id is browser', () => {
            spyOn(service, 'initNavSub');
            service.ngOnInit();
            expect(service.initNavSub).toHaveBeenCalled();
        });
    });

    describe('with PLATFORM_ID as UNIX', () => {
        beforeEach(() => {
            TestBed.overrideProvider(PLATFORM_ID, {useValue: UNIX_PLATFORM_ID});
            service = TestBed.inject(NavigationScrollDirective);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    it('should create an instance', () => {
        let el: ElementRef;
        let router: Router;
        const directive = new NavigationScrollDirective(UNIX_PLATFORM_ID, el, router);
        expect(directive).toBeTruthy();
    });
});

class MockElementRef implements ElementRef {
    nativeElement = {};
}
