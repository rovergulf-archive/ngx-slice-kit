import { LoadingDirective } from './loading.directive';
import {Component, ComponentFactoryResolver, DebugElement, ViewContainerRef} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('LoadingDirective', () => {
    let directive: LoadingDirective;
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let loaderDe: DebugElement;
    let loaderEl: HTMLElement;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TestComponent, LoadingDirective],
            providers: [
                LoadingDirective,
                ViewContainerRef,
                ComponentFactoryResolver
            ]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        loaderDe = fixture.debugElement.query(By.directive(LoadingDirective));
        loaderEl = loaderDe.nativeElement;
        directive = loaderDe.injector.get(LoadingDirective);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should loader be set correctly', () => {
        expect(directive.loader).toEqual('choke');
    });
});

@Component({
    template: `
        <p sdkLoading="true" loader="choke"></p>>`
})
class TestComponent {
}
