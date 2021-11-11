import { Component, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
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
export class CheckboxComponent implements ControlValueAccessor {

    public checked: boolean = false;
    @Input() public small: boolean = false;
    @Input() public required: boolean = false;
    @Input() @HostBinding('class.disabled')
    public disabled: boolean = false;

    @Input() @HostBinding('class.sdk-input--warn')
    public error: string = undefined;

    constructor() {
    }

    @HostListener('click')
    @HostListener('keyup.enter')
    public onclick(): void {
        if (this.disabled) {
            return;
        }
        this.writeValue(!this.checked);
        this.onTouched();
        this.onChange(this.checked);
    }

    public writeValue(value): void {
        this.checked = value;
    }

    public onChange(value): void {
    }

    public onTouched(): void {
    }

    public registerOnChange(fn): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
