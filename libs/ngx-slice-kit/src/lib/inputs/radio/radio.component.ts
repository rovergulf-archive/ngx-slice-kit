import { Component, forwardRef, HostBinding, Input, OnInit } from '@angular/core';
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
export class RadioComponent implements ControlValueAccessor, OnInit {

    @Input() label: string = '';
    @Input() data: any;
    @Input() tabindex: number = 0;
    @Input() small: boolean = false;
    @Input() required: boolean = false;
    @Input() @HostBinding('class.sdk-input--warn') error: string = undefined;
    @Input() @HostBinding('class.disabled') disabled: boolean = false;

    value: any = undefined;

    constructor() {
    }

    select(value): void {
        this.writeValue(value);
        this.onTouched();
        this.onChange(value);
    }

    writeValue(value): void {
        const selected = this.data.find(el => el.value === value);
        if (selected) {
            this.value = selected.value;
        }
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

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnInit() {
    }

}
