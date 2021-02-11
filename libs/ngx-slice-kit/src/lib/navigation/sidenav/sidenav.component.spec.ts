import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import {DebugElement} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let sidenavDe: DebugElement;
    let sidenavEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            declarations: [SidenavComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        sidenavDe = fixture.debugElement;
        sidenavEl = sidenavDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
