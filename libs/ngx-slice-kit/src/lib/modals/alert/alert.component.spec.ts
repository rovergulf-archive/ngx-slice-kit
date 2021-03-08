import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import {AlertsComponent} from './alerts.component';
import {DebugElement} from '@angular/core';
import {AlertOptions} from './alert.model';
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

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
    let alertDe: DebugElement;
    let alertEl: HTMLElement;
    const optsA: AlertOptions = options[0];
    const optsB: AlertOptions = options[1];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
            ],
            declarations: [AlertComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        alertDe = fixture.debugElement;
        alertEl = alertDe.nativeElement;
    });

    it('should create', () => {
        component.options = optsA;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
