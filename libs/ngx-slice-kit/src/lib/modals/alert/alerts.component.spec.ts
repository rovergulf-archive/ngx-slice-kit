import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertsComponent } from './alerts.component';
import {AlertOptions} from './alert.model';
import {DebugElement} from '@angular/core';

const options: AlertOptions[] = [
    {title: 'Event was successful', message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.'},
    {title: 'Fout', message: 'Veel desktop publishing-pakketten en webpagina-editors gebruiken Lorem Ipsum nu als hun standaard.', positionX: 'center', positionY: 'bottom'},
];

describe('AlertsComponent', () => {
    let component: AlertsComponent;
    let fixture: ComponentFixture<AlertsComponent>;
    let alertsDe: DebugElement;
    let alertsEl: HTMLElement;
    const optsA: AlertOptions = options[0];
    const optsB: AlertOptions = options[1];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AlertsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertsComponent);
        component = fixture.componentInstance;
        alertsDe = fixture.debugElement;
        alertsEl = alertsDe.nativeElement;
    });

    it('should create', () => {
        component.options = optsA;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should alerts container has .sdk-alerts-container and sdk-alerts-container--top-right classes by default' , () => {
        component.options = optsA;
        fixture.detectChanges();
        expect(alertsEl).toHaveClass('sdk-alerts-container');
        expect(alertsEl).toHaveClass('sdk-alerts-container--top-right');
    });

    it('should alerts container has class .sdk-alerts-container--bottom-center if alert option has #positionX as "center" and positionY as "bottom"' , () => {
        component.options = optsB;
        fixture.detectChanges();
        fixture.detectChanges();
        expect(alertsEl).toHaveClass('sdk-alerts-container');
        expect(alertsEl).toHaveClass('sdk-alerts-container--bottom-center');
    });

    // it('should' , () => {});
    // it('should' , () => {});
    // it('should' , () => {});
});
