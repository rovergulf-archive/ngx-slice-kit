import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidenavContentComponent } from './sidenav-content.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidenavService} from './sidenav.service';
import {DebugElement} from '@angular/core';
import {SidenavState} from './sidenav.options';

describe('SidenavContentComponent', () => {
    let component: SidenavContentComponent;
    let fixture: ComponentFixture<SidenavContentComponent>;
    let sidenavContDe: DebugElement;
    let sidenavContEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            declarations: [SidenavContentComponent],
            providers: [SidenavService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavContentComponent);
        component = fixture.componentInstance;
        sidenavContDe = fixture.debugElement;
        sidenavContEl = sidenavContDe.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should sidenav-content host have ng-trigger classes for animation', () => {
       expect(sidenavContEl).toHaveClass('ng-trigger');
       expect(sidenavContEl).toHaveClass('ng-trigger-state');
    });

    it('should #marginLeft be equal 0 if options.mode is "over"', () => {
        component.sidenavService.options.mode = 'over';
        fixture.detectChanges();

        expect(component.marginLeft).toEqual(0);
    });

    it('should #marginLeft be equal options.width if options.mode is "side"', () => {
        component.sidenavService.options.mode = 'side';
        component.sidenavService.options.width = 100;
        fixture.detectChanges();

        expect(component.marginLeft).toEqual(component.sidenavService.options.width);
    });

    it('should state set correct settings for animation with opened value', () => {
        const stubOptions = {
            value: 'opened' as SidenavState,
            params: {
                marginLeft: 0
            }
        };
        component.sidenavService.isOpened = true;
        component.sidenavService.options.mode = 'over';
        fixture.detectChanges();

        expect(component.state).toEqual(stubOptions);
    });

    it('should state set correct settings for animation with closed value', () => {
        const stubOptions = {
            value: 'closed' as SidenavState,
            params: {
                marginLeft: 0
            }
        };
        component.sidenavService.isOpened = false;
        component.sidenavService.options.mode = 'over';
        fixture.detectChanges();

        expect(component.state).toEqual(stubOptions);
    });
});
