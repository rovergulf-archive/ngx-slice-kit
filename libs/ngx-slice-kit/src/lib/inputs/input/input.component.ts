import {
    AfterContentInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LayoutControlService } from '../../core/layout-control/layout-control.service';

@Component({
    selector: 'sdk-input, [sdk-input], [sdkInput]',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        }
    ],
    encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterContentInit {

    @Input() type: string = 'text';
    @Input() autocomplete: string = 'off';
    @Input() placeholder: string = 'Empty placeholder';
    @Input() required: boolean = false;
    @Input() tabindex: number = undefined;
    // @Input() valueMask: string = undefined;
    @Input() autofocus: boolean = false;
    @Input() min: number;
    @Input() max: number;
    @Input() icon: string;
    @Input() iconPosition: 'right' | 'left' = 'left';
    @Input() small: boolean = false;
    @Input() size: 'wide' | 'full-width';
    @Input() caption: string;
    @Input() label: string;

    @Input() @HostBinding('class.sdk-input--warn') error: string = undefined;
    @Input() @HostBinding('class.disabled') disabled: boolean = false;

    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @ViewChild('input', {static: true}) inputElementRef: ElementRef;
    value: any = undefined;
    focused: boolean = false;

    inputId: string = this.layoutControlService.generateLayoutElementHash();

    constructor(
        private layoutControlService: LayoutControlService,
        // private themeService: ThemeService,
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {
    }

    get iconPositionClass(): string {
        return this.icon ? `sdk-input__input--icon-${this.iconPosition}` : '';
    }

    emitFocus(): void {
        const event = {
            target: this.elementRef.nativeElement,
            eventName: 'focus',
            value: this.value || ''
        };
        this.focused = true;
        this.onFocus.emit(event);
    }

    emitBlur(): void {
        const event = {
            target: this.elementRef.nativeElement,
            eventName: 'blur',
            value: this.value || ''
        };
        this.focused = false;
        this.onBlur.emit(event);
    }

    get iconUrl() {
        return this.icon ? `url(${this.icon})` : '';
    }

    focus() {
        this.focused = true;
        this.inputElementRef.nativeElement.focus();
    }

    blur() {
        this.focused = false;
        this.inputElementRef.nativeElement.blur();
    }

    change(target): void {
        this.writeValue(target.value);
        this.onTouched();
    }

    onChange(value): void {
    }

    onTouched(): void {
    }

    writeValue(value: any): void {
        if (this.type === 'number') {
            if (value < this.min) {
                value = this.min;
            } else if (value > this.max) {
                value = this.max;
            }
        }
        this.value = value;
        this.onChange(this.value);
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

    private setSizeClass(): void {
        const availableSizeClasses = ['wide', 'full-width'];
        if (availableSizeClasses.includes(this.size)) {
            this.renderer.addClass(this.inputElementRef.nativeElement.parentElement, `sdk-input-wrap--${this.size}`);
        }
    }

    ngOnInit(): void {
        if (!!this.size) {
            this.setSizeClass();
        }
    }

    ngAfterContentInit() {
        if (this.autofocus && !this.disabled) {
            this.inputElementRef.nativeElement.focus();
        }
    }

    ngOnDestroy(): void {
        this.onFocus.complete();
        this.onBlur.complete();
    }
}
