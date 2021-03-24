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
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { OptionModel } from '../dropdown-option.model';
import { DropdownOptions } from '../dropdown.model';
import { DropdownService } from '../dropdown.service';
import { OptionsService } from '../options.service';

@Component({
    selector: 'sdk-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private req: boolean;

    @Input() set required(val: any) {
        this.req = val === '' || val === true;
    }

    get required(): any {
        return this.req;
    }

    @ViewChild('select', {static: true}) selectElem: ElementRef;

    @Input() options: OptionModel[] = [];
    @Input() label = '';
    @Input() placeholder = '';
    @Input() disabled: boolean;
    @Input() small: boolean = false;
    @Input() multi: boolean = false;
    @Input() enableNullValue: boolean = false;
    @Input() icon: string;
    @Input() caption: string = '';

    @Output() focusEvent: EventEmitter<any> = new EventEmitter();
    @Output() blurEvent: EventEmitter<any> = new EventEmitter();
    @Output() resultEvent: EventEmitter<any> = new EventEmitter();

    @Input() @HostBinding('class.invalid') error: string = undefined;

    @Input() @HostBinding('class.disabled') get isDisabled(): boolean {
        return this.disabled;
    }

    isOpen: boolean;
    focused: boolean;
    currentValue: OptionModel;
    currentValues: Set<OptionModel>;

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        private dropdownService: DropdownService,
        private optionsService: OptionsService,
    ) {
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
        return this.enableNullValue && !this.isInactive();
    }

    onOpen(ev?): void {
        this.isOpen = true;
        this.emitFocus();
    }

    onClose(ev?): void {
        this.isOpen = false;
        this.emitBlur();
    }

    emitBlur(): void {
        if (this.focused) {
            this.focused = false;
            this.blurEvent.emit();
        }
    }

    emitFocus(): void {
        if (!this.focused) {
            this.focused = true;
            this.focusEvent.emit();
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
            return this.currentValue?.label;
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
            this.resultEvent.emit(multipleResult);
        } else {
            this.currentValue = val;
            this.onChange(val);
            this.resultEvent.emit(this.currentValue);
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
            triggerRect: this.selectElem.nativeElement.getBoundingClientRect(),
            fitWidth: true,
            multi: this.multi,
            parentElem: this.selectElem.nativeElement,
        };

        this.dropdownService.showDropdown(opts).subscribe(res => {
            this.onClose();
            // this.optionsService.options = null;
            if (res) {
                this.onResult(res);
            }
        });
    }

    ngOnInit(): void {
        if (this.multi) {
            this.enableNullValue = true;
            this.currentValues = new Set<OptionModel>();
        }
    }

    ngOnDestroy(): void {
        this.blurEvent.complete();
        this.focusEvent.complete();
        this.resultEvent.complete();
    }

}
