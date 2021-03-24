import { Component, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'sdk-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ]
})
export class ToggleComponent implements OnInit {

    @HostBinding('class.sdk-switch--on') on: boolean = false;
    @HostBinding('class.sdk-switch--small') @Input() small: boolean = false;
    @HostBinding('class.disabled') @Input() disabled: boolean = false;

    @Input() isActive: boolean = false;

    constructor() {
    }

    @HostListener('click')
    @HostListener('keyup.enter')
    onclick(): void {
        if (this.disabled) {
            return;
        }
        this.writeValue(!this.on);
        this.onChange(this.on);
        this.isActive = this.on;
        this.onTouched();
    }

    writeValue(value): void {
        this.on = value;
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

    ngOnInit(): void {
        this.on = this.isActive;
    }

}
