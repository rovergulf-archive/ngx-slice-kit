import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../core/theme/theme.service';
import { LayoutControlService } from '../../core/layout-control/layout-control.service';

@Component({
    selector: 'sdk-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true
        }
    ]
})
export class TextareaComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private req: boolean;
    private res: boolean;

    @Input() set required(val: any) {
        this.req = val === '' || val === true;
    }

    get required(): any {
        return this.req;
    }

    @Input() placeholder: string = '';
    @Input() tabindex: number = undefined;
    @Input() minHeight: number = 76;
    @Input() maxHeight: number = 280;
    @Input() small: boolean;
    @Input() label: string;
    @Input() caption: string;
    @Input() resizable: boolean = true;

    @Input() @HostBinding('class.sdk-textarea--warn') error: string;
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() @HostBinding('class.full-width') fullWidth: boolean = false;

    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();

    @ViewChild('clone', {static: false}) elementClone: ElementRef;

    value: string = undefined;
    focused: boolean = false;
    rows: number = 3;

    textareaId: string = this.layoutControlService.generateLayoutElementHash();

    constructor(
        private layoutControlService: LayoutControlService,
        private elementRef: ElementRef,
        private themeService: ThemeService,
    ) {
    }

    ngOnInit(): void {
        if (this.disabled && this.resizable) {
            this.resizable = false;
        }
    }

    onFocus(): void {
        const event = {
            target: this.elementRef.nativeElement,
            eventName: 'focus',
            value: this.value || ''
        };
        this.focused = true;
        this.focus.emit(event);
    }

    onBlur(): void {
        const event = {
            target: this.elementRef.nativeElement,
            eventName: 'blur',
            value: this.value || ''
        };
        this.focused = false;
        this.blur.emit(event);
    }

    change(target): void {
        this.writeValue(target.value);
        this.onTouched();
        this.elementClone.nativeElement.innerText = target.value.replace(/\n^ *$/gm, '\n-');
    }

    writeValue(value: any): void {
        this.value = value;
        this.onChange(this.value);
    }

    onChange(value): void {
    }

    onTouched(): void {
    }

    isEmpty(): boolean {
        return !this.value || this.value.length < 1;
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

    ngOnDestroy(): void {
        this.focus.complete();
        this.blur.complete();
    }

}
