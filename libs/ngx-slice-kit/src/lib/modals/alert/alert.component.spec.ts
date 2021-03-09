import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import {AlertsComponent} from './alerts.component';
import {DebugElement, EventEmitter} from '@angular/core';
import {AlertOptions} from './alert.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {timer} from 'rxjs';
import {skip} from 'rxjs/operators';

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

    it('should component has correct index', () => {
        component.index = 5;
        expect(component.index).toEqual(5);
    });

    it('should state be opened after component init', () => {
        component.options = {timeout: 5000} as AlertOptions;
        expect(component.state).toEqual('closed'); // by default
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.state).toEqual('opened');
    });

    it('should #closed event be called if #closeTimer was triggered', fakeAsync(() => {
        spyOn(component.closed, 'emit');
        component.options = optsA;
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();

        component.closeTimer.subscribe(() => {
            expect(component.closed.emit).toHaveBeenCalled();
        });
        tick(6000);
    }));

    it('should #sub do not be closed just after init', () => {
        component.options = optsA;
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.sub.closed).not.toBeTrue();
    });

    it('should #state be "closed" after component was be destroyed', () => {
        component.options = optsA;
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();
        component.ngOnDestroy();
        fixture.detectChanges();

        expect(component.state).toEqual('closed');
    });

    it('should #closeTimer be undefined after component was destroyed', () => {
        component.options = optsA;
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();
        component.ngOnDestroy();
        fixture.detectChanges();

        expect(component.closeTimer).toBeUndefined();
    });

    it('should #sub be closed after component was destroyed', () => {
        component.options = optsA;
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();
        component.ngOnDestroy();
        fixture.detectChanges();

        expect(component.sub.closed).toBeTrue();
    });

    it('should #closed call #complete after component was destroyed', () => {
        component.options = optsA;
        spyOn(component.closed, 'complete');
        fixture.detectChanges();
        component.ngOnDestroy();
        fixture.detectChanges();

        expect(component.closed.complete).toHaveBeenCalled();
    });

    it('should #close method emit #closed event with component index', () => {
        component.options = {} as AlertOptions;
        component.index = 3;

        component.closed.subscribe(res => {
            expect(res).toEqual(3);
        });

        component.close();
    });

    it('should #close method emit #action event if options has #action prop', () => {
        component.options = new AlertOptions({action: true} as AlertOptions);
        fixture.detectChanges();
        spyOn(component.options.$action, 'emit');
        spyOn(component.options.$action, 'complete');

        component.close();
        expect(component.options.$action.emit).toHaveBeenCalled();
        expect(component.options.$action.complete).toHaveBeenCalled();
    });

    it('should element has no .sdk-alert--small class if opts #smalL is "false"', () => {
        component.options = new AlertOptions({...optsA, small: false});
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert');

        expect(el).not.toHaveClass('sdk-alert--small');
    });

    it('should element has .sdk-alert--small class if opts #smalL is "true"', () => {
        component.options = new AlertOptions({...optsA, small: true});
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert');

        expect(el).toHaveClass('sdk-alert--small');
    });

    it('should be sdk-custom-icon element if options #type is "default" and options has #customIcon prop', () => {
        component.options = new AlertOptions({...optsA, type: 'default', customIcon: 'some-icon'});
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-custom-icon');
        const error: HTMLElement = alertEl.querySelector('sdk-icon[icon="alert"]');

        expect(el).toBeTruthy();
        expect(error).not.toBeTruthy();
    });

    it('should be sdk-alert icon element if options #type is "error"', () => {
        component.options = new AlertOptions({...optsA, type: 'error'});
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('sdk-icon[icon="alert"]');

        expect(el).toBeTruthy();
    });

    it('should alert has title if #options has it', () => {
        component.options = new AlertOptions(optsA);
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert__title');

        expect(el).toBeTruthy();
    });

    it('should alert title be equal alert #options.title prop', () => {
        component.options = new AlertOptions(optsA);
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert__title');

        expect(el.textContent).toEqual(optsA.title);
    });

    it('should alert message be equal alert #options.message prop', () => {
        component.options = new AlertOptions(optsA);
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-text');

        expect(el.textContent).toEqual(optsA.message);
    });


    it('should be alert interface element if options has #action as true', () => {
        component.options = new AlertOptions({...optsA, action: true});
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert__interface');
        expect(el).toBeTruthy();
    });

    it('should not be alert interface element if options has #action as false', () => {
        component.options = new AlertOptions({...optsA, action: false});
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert__interface');
        expect(el).not.toBeTruthy();
    });

    it('should text of interface item be equal #actionText of options', () => {
        component.options = new AlertOptions({...optsA, action: true, actionText: 'some text'});
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert__interface-item');
        expect(el.textContent).toEqual('some text');
    });

    it('should click on alert interface item call #close method with "true" as argument', () => {
        component.options = new AlertOptions({...optsA, action: true});
        spyOn(component, 'close');
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert__interface-item');
        el.click();
        expect(component.close).toHaveBeenCalledWith(true);
    });

    it('should click on alert-close element call #close method', () => {
        component.options = new AlertOptions(optsA);
        spyOn(component, 'close');
        fixture.detectChanges();

        const el: HTMLElement = alertEl.querySelector('.sdk-alert__close');
        el.click();
        expect(component.close).toHaveBeenCalled();
    });
});
