import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    Output,
    PLATFORM_ID,
    Renderer2,
    ViewChild
} from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { OptionModel } from '../dropdown-option.model';
import { DropdownOptions } from '../dropdown.model';
import { DropdownService } from '../dropdown.service';
import { OptionsService } from '../options.service';
import { LayoutControlService } from '../../core/layout-control/layout-control.service';

@Component({
    selector: 'sdk-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutocompleteComponent),
            multi: true
        }
    ]
})
export class AutocompleteComponent implements ControlValueAccessor, OnDestroy {

    private $options: BehaviorSubject<OptionModel[]> = new BehaviorSubject<OptionModel[]>(null);
    private req: boolean;

    @Input() public set options(o: OptionModel[]) {
        this.$options.next(o);
        if (this.isOpen) {
            this.optionsService.options = this.getOptions();
        }
    }

    public get options(): OptionModel[] {
        return this.$options.getValue();
    }

    @Input() public set required(val: any) {
        this.req = val === '' || val === true;
    }

    public get required(): any {
        return this.req;
    }

    public sub: Subscription;
    @ViewChild('autocomplete', {static: true}) public autocomplete: ElementRef;
    @ViewChild('input', {static: true}) public inputElementRef: ElementRef;
    @Input() public label = '';
    @Input() public placeholder = '';
    @Input() public disabled: boolean;
    @Input() public small: boolean = false;
    @Input() public icon: string;
    @Input() public caption: string = '';

    @Output() public focusEvent: EventEmitter<any> = new EventEmitter();
    @Output() public blurEvent: EventEmitter<any> = new EventEmitter();
    @Output() public resultEvent: EventEmitter<any> = new EventEmitter();
    @Output() public valueChanges: EventEmitter<any> = new EventEmitter();

    @Input() @HostBinding('class.invalid')
    public error: string = undefined;

    @Input() @HostBinding('class.disabled')
    public get isDisabled(): boolean {
        return this.disabled;
    }

    public isOpen: boolean;
    public focused: boolean;
    public currentValue: OptionModel;
    public currentValues: Set<OptionModel>;
    public uid: string;

    public value: string = '';

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        private dropdownService: DropdownService,
        private optionsService: OptionsService,
        private renderer: Renderer2,
        private layoutControlService: LayoutControlService
    ) {
        this.uid = layoutControlService.generateLayoutElementHash();
    }

    public getOptions(): OptionModel[] {
        return [...this.options].map(o => {
            o.selected = this.currentValue === o;
            return o;
        });
    }

    public isInactive(): boolean {
        return !this.currentValue;
    }

    public hasValuesToDrop(): boolean {
        return !this.isInactive();
    }

    public onOpen(): void {
        this.isOpen = true;
        this.emitFocus();
    }

    public onClose(): void {
        this.isOpen = false;
        this.emitBlur();
    }

    public emitBlur(): void {
        if (this.focused) {
            this.focused = false;
            this.blurEvent.emit();
        }
    }

    public emitFocus(): void {
        if (!this.focused) {
            this.focused = true;
            this.focusEvent.emit();
        }
    }

    public selected(): string {
        return this.currentValue?.label ?? '';
    }

    public onResult(option: OptionModel): void {
        this.onTouched();
        this.writeValue(option);
    }

    public writeValue(val): void {
        if (val?.size > 0) {
            this.currentValues = val;
            const multipleResult = this.options.filter(o => this.currentValues.has(o));
            this.onChange(multipleResult);
            this.resultEvent.emit(multipleResult);
        } else {
            this.currentValue = val;
            this.onChange(val);
            this.resultEvent.emit(this.currentValue);
        }
    }

    public addValue(o: OptionModel): void {
        const alreadySelected = this.currentValues.has(o);
        o.selected = !alreadySelected;
        alreadySelected ? this.currentValues.delete(o) : this.currentValues.add(o);
        this.writeValue(this.currentValues);
    }

    public clearValue(e): void {
        e.stopPropagation();
        this.valueChanges.emit(null);
        this.currentValue = undefined;
        this.writeValue(undefined);
    }

    public onChange(value): void {
    }

    public onTouched(): void {
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public setInputSubscription(): void {
        this.sub = fromEvent(this.inputElementRef.nativeElement, `keyup`).pipe(
            debounceTime(500)
        ).subscribe((e: any) => {
            if (e.code === 'ArrowUp' ||
                e.code === 'ArrowDown' ||
                e.code === 'Escape' ||
                e.code === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            const value = e?.target?.value;
            this.valueChanges.emit(value);
        });
    }

    public onInput(ev: any): void {
        if (ev.code === 'ArrowUp' ||
            ev.code === 'ArrowDown' ||
            ev.code === 'Escape' ||
            ev.code === 'Enter') {
            ev.preventDefault();
            ev.stopPropagation();
            return;
        }
        const value = ev?.target?.value;
        this.valueChanges.emit(value);
    }

    public showDropdown(): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        if (this.isOpen) {
            return;
        }
        this.onOpen();
        this.optionsService.options = this.getOptions();

        const opts: DropdownOptions = {
            triggerRect: this.autocomplete.nativeElement.getBoundingClientRect(),
            fitWidth: true,
            multi: false,
            hideBackdrop: true,
            parentElem: this.autocomplete.nativeElement,
        };

        this.dropdownService.showDropdown(opts).subscribe(res => {
            this.onClose();
            // this.optionsService.options = null;
            if (res) {
                this.inputElementRef.nativeElement.blur();
                this.onResult(res);
            }
        });
    }

    // public ngOnInit(): void {
    //     // this.setInputSubscription();
    // }

    public ngOnDestroy(): void {
        this.sub?.unsubscribe();
        this.blurEvent.complete();
        this.focusEvent.complete();
        this.resultEvent.complete();
        this.valueChanges.complete();
    }
}
