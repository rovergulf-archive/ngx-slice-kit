import {DropdownMenuTriggerDirective} from './dropdown-menu-trigger.directive';
import {Component, PLATFORM_ID} from '@angular/core';
import {DropdownService} from '../dropdown.service';
import {OptionsService} from '../options.service';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {DropdownOptions} from '../dropdown.model';
import {OptionModel} from '../dropdown-option.model';

const options: OptionModel[] = [
    {value: 1, label: 'Red Dead Redemption 2'},
    {value: 2, label: 'Death Stranding'},
    {value: 3, label: 'Bloodborne'},
    {value: 4, label: 'Witcher 3'},
    {value: 5, label: 'Cyberpunk 2077'},
    {value: 6, label: 'Assassins Creed: Valhalla'},
    {value: 7, label: 'Mortal Kombat 11'}
];

describe('DropdownMenuTriggerDirective', () => {
    const PLATFORM_SERVER_ID = 'server';
    const PLATFORM_BROWSER_ID = 'browser';
    const UNIX_PLATFORM_ID: number = 4;
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dropdownService: DropdownService;
    let optionsService: OptionsService;
    let dropdownDe;
    let dropdownEl;
    let directive;
    const stubOptionA = options;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DropdownMenuTriggerDirective, TestComponent],
            providers: [
                {provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID},
                OptionsService,
                DropdownService
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        dropdownService = TestBed.inject(DropdownService);
        optionsService = TestBed.inject(OptionsService);
        dropdownDe = fixture.debugElement.query(By.directive(DropdownMenuTriggerDirective));
        directive = dropdownDe.injector.get(DropdownMenuTriggerDirective);
        dropdownEl = dropdownDe.nativeElement;

        fixture.detectChanges();
    }));

    it('should create component', () => {
        expect(component).toBeDefined();
    });

    it('should click by element emit #opened event if dropdown is closed', () => {
        spyOn(component, 'openHandler');
        dropdownEl.click();
        expect(component.openHandler).toHaveBeenCalled();
    });

    it('should result / closed / opened be completed after component was destroyed', () => {
        spyOn(directive.closed, 'complete');
        spyOn(directive.opened, 'complete');
        spyOn(directive.resultEvent, 'complete');

        fixture.detectChanges();
        directive.ngOnInit();
        directive.ngOnDestroy();

        expect(directive.closed.complete).toHaveBeenCalled();
        expect(directive.opened.complete).toHaveBeenCalled();
        expect(directive.resultEvent.complete).toHaveBeenCalled();
    });

    it('should create an instance', () => {
        const dir = new DropdownMenuTriggerDirective(UNIX_PLATFORM_ID, dropdownService, dropdownEl, optionsService);
        expect(dir).toBeTruthy();
    });

    it('should directive #isOpened be true after click if dropdown was closed', () => {
        dropdownEl.click();
        expect(directive.isOpened).toBeTrue();
    });

    it('should stop #open() fn if component already is opened', () => {
        directive.isOpened = true;
        const showDropdownResult = directive.open();

        expect(showDropdownResult).toBeUndefined('if #isOpened is true dropdown should not be open again');
    });

    it('should #open() emit #closed() after get date', () => {
        spyOn(component, 'closedHandler');
        spyOn(dropdownService, 'showDropdown').and.returnValue(of(stubOptionA));

        fixture.detectChanges();
        directive.open();
        expect(component.closedHandler).toHaveBeenCalled();
        expect(directive.isOpened).toBeFalse();
    });

    it('should #open() emit #result() with data argument after get it', () => {
        spyOn(dropdownService, 'showDropdown').and.returnValue(of(stubOptionA));
        spyOn(component, 'firstResult');

        const opts: DropdownOptions = {
            triggerRect: dropdownEl.getBoundingClientRect(),
            fitWidth: true,
            multi: false,
        };

        fixture.detectChanges();
        directive.open();

        expect(dropdownService.showDropdown).toHaveBeenCalledWith(opts);
        expect(component.firstResult).toHaveBeenCalledWith(stubOptionA);
    });

    it('should #open() not emit #result() if have no data', () => {
        spyOn(dropdownService, 'showDropdown').and.returnValue(of(undefined));
        spyOn(component, 'firstResult');

        fixture.detectChanges();
        directive.open();

        expect(component.firstResult).not.toHaveBeenCalled();
    });
});

// Test component

@Component({
    template: `
        <p sdkDropdownMenuTrigger
           [options]="options1"
           [fitWidth]="true"
           [multi]="false"
           (opened)="openHandler()"
           (closed)="closedHandler()"
           (resultEvent)="firstResult($event)">Choose game: {{result1}}</p>>`
})
class TestComponent {
    public result1: any = '';
    public options1: OptionModel[] = options;

    constructor() {
    }

    public openHandler(): void {
    }

    public closedHandler(): void {
    }

    public firstResult(ev: any): void {
        this.result1 = ev.label;
    }
}
