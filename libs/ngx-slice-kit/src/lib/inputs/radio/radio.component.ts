import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'sdk-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true
        }
    ]
})
export class RadioComponent implements ControlValueAccessor {

    @Input() public label: string = '';
    @Input() public data: any;
    @Input() public tabindex: number = 0;
    @Input() public small: boolean = false;
    @Input() public required: boolean = false;
    @Input() @HostBinding('class.disabled')
    public disabled: boolean = false;
    @Input() @HostBinding('class.sdk-input--warn')
    public error: string = undefined;

    public value: any = undefined;

    constructor() {
    }

    public select(value): void {
        this.writeValue(value);
        this.onTouched();
        this.onChange(value);
    }

    public writeValue(value): void {
        const selected = this.data.find(el => el.value === value);
        if (selected) {
            this.value = selected.value;
        }
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

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
