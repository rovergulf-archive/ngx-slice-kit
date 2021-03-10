import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import {RouterTestingModule} from '@angular/router/testing';
// import {DebugElement} from '@angular/core';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;
    // let dialogDe: DebugElement;
    // let dialogEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        // dialogDe = fixture.debugElement;
        // dialogEl = dialogDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
