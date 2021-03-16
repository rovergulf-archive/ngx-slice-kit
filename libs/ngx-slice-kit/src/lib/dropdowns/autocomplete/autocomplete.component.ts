import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
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
export class AutocompleteComponent implements ControlValueAccessor, OnInit, OnDestroy {

    private $options: BehaviorSubject<OptionModel[]> = new BehaviorSubject<OptionModel[]>(null);
    private req: boolean;

    @Input() set options(o: OptionModel[]) {
        this.$options.next(o);
        if (this.isOpen) {
            this.optionsService.options = this.getOptions();
        }
    }

    get options(): OptionModel[] {
        return this.$options.getValue();
    }

    @Input() set required(val: any) {
        this.req = val === '' || val === true;
    }

    get required(): any {
        return this.req;
    }

    sub: Subscription;
    @ViewChild('autocomplete', {static: true}) autocomplete: ElementRef;
    @ViewChild('input', {static: true}) inputElementRef: ElementRef;
    @Input() label = '';
    @Input() placeholder = 'Find option';
    @Input() disabled: boolean;
    @Input() small: boolean = false;
    @Input() multi: boolean = false;
    @Input() enableNullValue: boolean = false;
    @Input() icon: string;
    @Input() caption: string = '';

    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    @Output() result: EventEmitter<any> = new EventEmitter();
    @Output() valueChanges: EventEmitter<any> = new EventEmitter();

    @Input() @HostBinding('class.invalid') error: string = undefined;

    @Input() @HostBinding('class.disabled') get isDisabled(): boolean {
        return this.disabled;
    }

    isOpen: boolean;
    focused: boolean;
    currentValue: OptionModel;
    currentValues: Set<OptionModel>;
    uid: string;

    value: string = '';

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

    getOptions(): OptionModel[] {
        return [...this.options].map(o => {
            o.selected = this.multi ? this.currentValues?.has(o) : this.currentValue === o;
            return o;
        });
    }

    isInactive(): boolean {
        return this.multi ? !this.currentValues?.size : !this.currentValue;
    }

    hasValuesToDrop(): boolean {
        return !this.isInactive();
    }

    onOpen(): void {
        this.isOpen = true;
        this.emitFocus();
    }

    onClose(): void {
        this.isOpen = false;
        this.emitBlur();
    }

    emitBlur(): void {
        if (this.focused) {
            this.focused = false;
            this.onBlur.emit();
        }
    }

    emitFocus(): void {
        if (!this.focused) {
            this.focused = true;
            this.onFocus.emit();
        }
    }

    selected(): string {
        if (this.multi) {
            const selectedOptions = [];
            this.currentValues?.forEach(o => {
                selectedOptions.push(o.label);
            });
            return selectedOptions.length ? selectedOptions.join(', ') : '';
        } else {
            return this.currentValue?.label ?? '';
        }
    }

    onResult(option: OptionModel): void {
        this.onTouched();
        if (this.multi) {
            this.addValue(option);
        } else {
            this.writeValue(option);
        }
    }

    writeValue(val): void {
        if (val?.size > 0) {
            this.currentValues = val;
            const multipleResult = this.options.filter(o => this.currentValues.has(o));
            this.onChange(multipleResult);
            this.result.emit(multipleResult);
        } else {
            this.currentValue = val;
            this.onChange(val);
            this.result.emit(this.currentValue);
        }
    }

    addValue(o: OptionModel): void {
        const alreadySelected = this.currentValues.has(o);
        o.selected = !alreadySelected;
        alreadySelected ? this.currentValues.delete(o) : this.currentValues.add(o);
        this.writeValue(this.currentValues);
    }

    clearValue(e): void {
        e.stopPropagation();
        this.valueChanges.emit(null);
        this.multi ? this.currentValues?.clear() : this.currentValue = undefined;
        this.writeValue(undefined);
    }

    onChange(value): void {
    }

    onTouched(): void {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    setInputSubscription(): void {
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

    onInput(ev: any): void {
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

    showDropdown(): void {
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
            multi: this.multi,
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

    ngOnInit(): void {
        if (this.multi) {
            this.enableNullValue = true;
            this.currentValues = new Set<OptionModel>();
        }

        // this.setInputSubscription();
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
        this.onBlur.complete();
        this.onFocus.complete();
        this.result.complete();
        this.valueChanges.complete();
    }
}
