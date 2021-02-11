import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidenavContentComponent } from './sidenav-content.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SidenavContentComponent', () => {
    let component: SidenavContentComponent;
    let fixture: ComponentFixture<SidenavContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            declarations: [SidenavContentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
