import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavTabsComponent } from './nav-tabs.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';

describe('NavTabsComponent', () => {
    let component: NavTabsComponent;
    let fixture: ComponentFixture<NavTabsComponent>;
    let navTabsDe: DebugElement;
    let navTabsEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [NavTabsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavTabsComponent);
        component = fixture.componentInstance;
        navTabsDe = fixture.debugElement;
        navTabsEl = navTabsDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
