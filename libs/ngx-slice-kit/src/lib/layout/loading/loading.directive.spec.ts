import { LoadingDirective } from './loading.directive';
import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoadingDirective', () => {
    let directive: LoadingDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                LoadingDirective,
                ViewContainerRef,
                ComponentFactoryResolver
            ]
        });
        directive = TestBed.inject(LoadingDirective);
    });

    it('should create an instance', () => {
        // let viewRef: ViewContainerRef;
        // let resolver: ComponentFactoryResolver;
        // const directive = new LoadingDirective(
        //     viewRef,
        //     resolver
        // );
        expect(directive).toBeTruthy();
    });
});
