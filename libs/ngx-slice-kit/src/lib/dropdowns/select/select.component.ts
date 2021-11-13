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

    @Input() public set required(val: any) {
        this.req = val === '' || val === true;
    }

    public get required(): any {
        return this.req;
    }

    @ViewChild('select', {static: true}) public selectElem: ElementRef;

    @Input() public options: OptionModel[] = [];
    @Input() public label = '';
    @Input() public placeholder = '';
    @Input() public disabled: boolean;
    @Input() public small: boolean = false;
    @Input() public multi: boolean = false;
    @Input() public enableNullValue: boolean = false;
    @Input() public icon: string;
    @Input() public caption: string = '';

    @Output() public focusEvent: EventEmitter<any> = new EventEmitter();
    @Output() public blurEvent: EventEmitter<any> = new EventEmitter();
    @Output() public resultEvent: EventEmitter<any> = new EventEmitter();

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

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: any,
        private dropdownService: DropdownService,
        private optionsService: OptionsService,
    ) {
    }

    public getOptions(): OptionModel[] {
        return [...this.options].map(o => {
            o.selected = this.multi ? this.currentValues?.has(o) : this.currentValue === o;
            return o;
        });
    }

    public isInactive(): boolean {
        return this.multi ? !this.currentValues?.size : !this.currentValue;
    }

    public hasValuesToDrop(): boolean {
        return this.enableNullValue && !this.isInactive();
    }

    public onOpen(ev?): void {
        this.isOpen = true;
        this.emitFocus();
    }

    public onClose(ev?): void {
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

    public onResult(option: OptionModel): void {
        this.onTouched();
        if (this.multi) {
            this.addValue(option);
        } else {
            this.writeValue(option);
        }
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
        this.multi ? this.currentValues?.clear() : this.currentValue = undefined;
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

    public ngOnInit(): void {
        if (this.multi) {
            this.enableNullValue = true;
            this.currentValues = new Set<OptionModel>();
        }
    }

    public ngOnDestroy(): void {
        this.blurEvent.complete();
        this.focusEvent.complete();
        this.resultEvent.complete();
    }
}
