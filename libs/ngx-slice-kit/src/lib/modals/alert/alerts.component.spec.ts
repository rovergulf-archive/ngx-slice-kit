import {ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {AlertsComponent} from './alerts.component';
import {AlertOptions} from './alert.model';
import {DebugElement} from '@angular/core';
import {skip} from 'rxjs/operators';
import {IconComponent} from '../../buttons/icon/icon.component';
import {AlertComponent} from '../../../public-api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const options: AlertOptions[] = [
    {title: 'Event was successful', message: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.'},
    {
        title: 'Fout',
        message: 'Veel desktop publishing-pakketten en webpagina-editors gebruiken Lorem Ipsum nu als hun standaard.',
        positionX: 'center',
        positionY: 'bottom'
    },
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
            imports: [BrowserAnimationsModule],
            declarations: [
                AlertComponent,
                AlertsComponent,
                IconComponent,
            ]
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

    it('should alerts container has .sdk-alerts-container and sdk-alerts-container--top-right classes by default', () => {
        component.options = optsA;
        fixture.detectChanges();
        expect(alertsEl).toHaveClass('sdk-alerts-container');
        expect(alertsEl).toHaveClass('sdk-alerts-container--top-right');
    });

    it('should alerts container has class .sdk-alerts-container--bottom-center if alert option has #positionX as "center" and positionY as "bottom"', () => {
        component.options = optsB;
        fixture.detectChanges();
        fixture.detectChanges();
        expect(alertsEl).toHaveClass('sdk-alerts-container');
        expect(alertsEl).toHaveClass('sdk-alerts-container--bottom-center');
    });

    it('should component #state property be "closed" after #ngOnDestroy event', () => {
        component.options = optsA;
        component.state = 'opened';
        component.ngOnDestroy();
        fixture.detectChanges();
        expect(component.state).toEqual('closed');
    });

    it('should $alerts subscription works correctly', () => {
        component.$alerts.pipe(skip(1)).subscribe(res => {
            expect(res[0]).toEqual(new AlertOptions(optsA));
        });
        component.options = optsA;
    });

    it('should $alerts subscription works correctly again', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        component.$alerts.pipe(skip(2)).subscribe(res => {
            expect(res).toEqual([stubOptionsA, stubOptionsB]);
        });
        component.options = optsA;
        component.options = optsB;
    });

    it('should #alerts has array of options from $alerts stream as value', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        component.options = optsA;
        component.options = optsB;

        expect(component.alerts).toEqual([stubOptionsA, stubOptionsB]);
    });

    it('should #alerts setter correctly set array of options', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        const stubAlerts = [stubOptionsA, stubOptionsB];

        component.$alerts.pipe(skip(1)).subscribe(res => {
            expect(res).toEqual(stubAlerts);
        });

        component.alerts = stubAlerts;
    });

    it('should #options has first option element of $alerts stream', () => {
        component.options = optsA;

        expect(component.options).toEqual(new AlertOptions(optsA));
    });

    it('should count of alerts element be equal to #alerts length', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        const stubAlerts = [stubOptionsA, stubOptionsB];

        component.alerts = stubAlerts;
        fixture.detectChanges();
        const alertsElements = alertsEl.querySelectorAll('.sdk-alert__wrapper');

        expect(alertsElements.length).toEqual(component.alerts.length);
    });

    it('should be "close all" element if alerts container has more then 1 item', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        const stubAlerts = [stubOptionsA, stubOptionsB];

        component.alerts = stubAlerts;
        fixture.detectChanges();
        const closeEl: HTMLElement = alertsEl.querySelector('.sdk-alert-close');

        expect(closeEl).toBeTruthy();
    });

    it('should not be "close all" element if alerts container has less then 2 item', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubAlerts = [stubOptionsA];

        component.alerts = stubAlerts;
        fixture.detectChanges();
        const closeEl: HTMLElement = alertsEl.querySelector('.sdk-alert-close');

        expect(closeEl).not.toBeTruthy();
    });

    it('should #click on ".sdk-alert-close" element call #closeAll method', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        const stubAlerts = [stubOptionsA, stubOptionsB];
        component.alerts = stubAlerts;
        fixture.detectChanges();

        spyOn(component, 'closeAll');

        const closeEl: HTMLElement = alertsEl.querySelector('.sdk-alert-close');

        closeEl.click();
        expect(component.closeAll).toHaveBeenCalled();
    });

    it('should #closeAll call #onClose method', fakeAsync(() => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        const stubAlerts = [stubOptionsA, stubOptionsB];
        component.alerts = stubAlerts;
        fixture.detectChanges();

        spyOn(component, 'onClose');

        component.closeAll();
        fixture.detectChanges();
        tick(5000);
        expect(component.onClose).toHaveBeenCalled();
        discardPeriodicTasks();
    }));

    it('should #onClose method rewrite #alerts prop', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        const stubAlerts = [stubOptionsA, stubOptionsB, stubOptionsB, stubOptionsB];
        const expectedALerts = stubAlerts.slice(1);
        component.alerts = stubAlerts;

        component.onClose(0);

        expect(component.alerts).toEqual(expectedALerts);
    });

    it('should not emit #closed event if alerts still exists', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        const stubAlerts = [stubOptionsA, stubOptionsB];

        spyOn(component.closed, 'emit');

        component.alerts = stubAlerts;
        component.onClose(0);

        expect(component.closed.emit).not.toHaveBeenCalled();
    });

    it('should #closed event emit if all alerts was deleted', () => {
        const stubOptionsA = new AlertOptions(optsA);
        const stubOptionsB = new AlertOptions(optsB);
        const stubAlerts = [stubOptionsA, stubOptionsB];

        spyOn(component.closed, 'emit');

        component.alerts = stubAlerts;
        component.onClose(0);
        component.onClose(0);

        expect(component.closed.emit).toHaveBeenCalled();
    });
});
