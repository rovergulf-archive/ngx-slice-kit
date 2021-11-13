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

    @HostBinding('class.sdk-switch--on')
    public on: boolean = false;

    @HostBinding('class.sdk-switch--small')
    @Input()
    public small: boolean = false;

    @HostBinding('class.disabled')
    @Input()
    public disabled: boolean = false;

    @Input()
    public isActive: boolean = false;

    constructor() {
    }

    @HostListener('click')
    @HostListener('keyup.enter')
    public onclick(): void {
        if (this.disabled) {
            return;
        }
        this.writeValue(!this.on);
        this.onChange(this.on);
        this.isActive = this.on;
        this.onTouched();
    }

    public writeValue(value): void {
        this.on = value;
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

    public ngOnInit(): void {
        this.on = this.isActive;
    }

}
