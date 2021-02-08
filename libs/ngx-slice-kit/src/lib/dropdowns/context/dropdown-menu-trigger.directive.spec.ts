import {DropdownMenuTriggerDirective} from './dropdown-menu-trigger.directive';
import {Component, ElementRef, PLATFORM_ID} from '@angular/core';
import {DropdownService} from '../dropdown.service';
import {OptionsService} from '../options.service';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {OPTIONS1} from '../../../../../../src/app/shared/values/dropdowns.values';
import {OptionModel} from 'ngx-slice-kit';

describe('DropdownMenuTriggerDirective', () => {
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const UNIX_PLATFORM_ID: number = 4;
    // let component: DropdownMenuTriggerDirective;
    // let fixture: ComponentFixture<DropdownMenuTriggerDirective>;
    // let dropdownDe;
    // let dropdownEl;
    // const testIndexA = 0;
    // const testIndexB = 2;
    // const stubOptionA = OPTIONS1[testIndexA];
    // const stubOptionB = OPTIONS1[testIndexB];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DropdownMenuTriggerDirective, TestComponent],
            providers: [
                {provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID},
                OptionsService,
                DropdownService
            ]
        })
            .compileComponents();
    }));

    // it('should create an instance', () => {
    //     const dropdownService: DropdownService;
    //     const el: ElementRef;
    //     const optionsService: OptionsService;
    //     const directive = new DropdownMenuTriggerDirective(UNIX_PLATFORM_ID, dropdownService, el, optionsService);
    //     expect(directive).toBeTruthy();
    // });

    // it('should result / closed / opened be completed after component was destroyed', () => {
    //     spyOn(component.closed, 'complete');
    //     spyOn(component.opened, 'complete');
    //     spyOn(component.result, 'complete');
    //
    //     fixture.detectChanges();
    //     component.ngOnInit();
    //     component.ngOnDestroy();
    //
    //     expect(component.closed.complete).toHaveBeenCalled();
    //     expect(component.opened.complete).toHaveBeenCalled();
    //     expect(component.result.complete).toHaveBeenCalled();
    // });
});

// Test component

@Component({
    template: `
        <div class="example flex-column layout-start-stretch">
            <h3>First choice</h3>
            <div class="flex-row layout-start-start">
                <div class="flex-grow-1"></div>
                <div class="flex-column layout-start-start">
                    <p sdkDropdownMenuTrigger [options]="options1" (result)="firstResult($event)">Choose game: {{result1}}</p>
                </div>
            </div>
        </div>`
})
class TestComponent {
    result1: any = '';
    options1: OptionModel[] = OPTIONS1;

    constructor() {
    }

    firstResult(ev: any): void {
        // console.log('first: ', ev);
        this.result1 = ev.label;
    }
}
