import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { OptionsService } from './options.service';
import { Renderer2 } from '@angular/core';
import { DropdownService } from './dropdown.service';
import { SelectComponent } from './select/select.component';
import { DropdownOptions } from './dropdown.model';

describe('DropdownComponent', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;
    let selectComponent: SelectComponent;
    let selectFixture: ComponentFixture<SelectComponent>;
    let opts: DropdownOptions;
    let optionsService: OptionsService;
    let dropdown: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DropdownComponent, SelectComponent],
            providers: [
                // DOCUMENT,
                OptionsService,
                DropdownService,
                Renderer2,
            ]
        })
            .compileComponents();
        optionsService = TestBed.inject(OptionsService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DropdownComponent);
        component = fixture.componentInstance;
        selectFixture = TestBed.createComponent(SelectComponent);
        selectComponent = selectFixture.componentInstance;
        dropdown = fixture.debugElement.nativeElement;

        opts = {
            triggerRect: selectComponent.selectElem.nativeElement.getBoundingClientRect(),
            fitWidth: true,
            multi: selectComponent.multi,
            parentElem: selectComponent.selectElem.nativeElement,
        };
        component.config = opts;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
