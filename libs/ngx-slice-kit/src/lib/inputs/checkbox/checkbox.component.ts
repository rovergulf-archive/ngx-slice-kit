import { Component, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'sdk-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {

    checked: boolean = false;
    @Input() small: boolean = false;
    @Input() required: boolean = false;
    @Input() @HostBinding('class.disabled') disabled: boolean = false;

    @Input() @HostBinding('class.sdk-input--warn') error: string = undefined;

    constructor() {
    }

    @HostListener('click')
    @HostListener('keyup.enter')
    onclick(): void {
        if (this.disabled) {
            return;
        }
        this.writeValue(!this.checked);
        this.onTouched();
        this.onChange(this.checked);
    }

    writeValue(value): void {
        this.checked = value;
    }

    onChange(value): void {
    }

    onTouched(): void {
    }

    registerOnChange(fn): void {
        this.onChange = fn;
    }

    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnInit() {
    }

}
