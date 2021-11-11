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
    private req: boolean = false;

    @Input() public set required(val: any) {
        this.req = val === '' || val === true;
    }

    public get required(): any {
        return this.req;
    }

    @Input() public type: string = 'text';
    @Input() public autocomplete: string = 'off';
    @Input() public placeholder: string = '';
    @Input() public tabindex: number = undefined;
    // @Input() valueMask: string = undefined;
    @Input() public autofocus: boolean = false;
    @Input() public min: number;
    @Input() public max: number;
    @Input() public icon: string;
    @Input() public iconPosition: 'right' | 'left' = 'left';
    @Input() public small: boolean = false;
    @Input() public size: 'wide' | 'full-width';
    @Input() public caption: string;
    @Input() public label: string;

    @Input() @HostBinding('class.sdk-input--warn')
    public error: string = undefined;
    @Input() @HostBinding('class.disabled')
    public disabled: boolean = false;

    @Output() public focusEvent: EventEmitter<any> = new EventEmitter();
    @Output() public blurEvent: EventEmitter<any> = new EventEmitter();

    @ViewChild('input', {static: true}) public inputElementRef: ElementRef;
    public value: any = undefined;
    public focused: boolean = false;

    public inputId: string = this.layoutControlService.generateLayoutElementHash();

    constructor(
        private layoutControlService: LayoutControlService,
        // private themeService: ThemeService,
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {
    }

    public get iconPositionClass(): string {
        return this.icon ? `sdk-input__input--icon-${this.iconPosition}` : '';
    }

    public emitFocus(): void {
        const event = {
            target: this.elementRef.nativeElement,
            eventName: 'focus',
            value: this.value || ''
        };
        this.focused = true;
        this.focusEvent.emit(event);
    }

    public emitBlur(): void {
        const event = {
            target: this.elementRef.nativeElement,
            eventName: 'blur',
            value: this.value || ''
        };
        this.focused = false;
        this.blurEvent.emit(event);
    }

    public get iconUrl(): string {
        return this.icon ? `url(${this.icon})` : '';
    }

    public focus(): void {
        this.focused = true;
        this.inputElementRef.nativeElement.focus();
    }

    public blur(): void {
        this.focused = false;
        this.inputElementRef.nativeElement.blur();
    }

    public change(target): void {
        this.writeValue(target.value);
        this.onTouched();
    }

    public onChange(value): void {
    }

    public onTouched(): void {
    }

    public writeValue(value: any): void {
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

    public registerOnChange(fn): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private setSizeClass(): void {
        const availableSizeClasses = ['wide', 'full-width'];
        if (availableSizeClasses.includes(this.size)) {
            this.renderer.addClass(this.elementRef.nativeElement, `sdk-input--${this.size}`);
        }
    }

    public ngOnInit(): void {
        if (!!this.size) {
            this.setSizeClass();
        }
    }

    public ngAfterContentInit(): void {
        if (this.autofocus && !this.disabled) {
            this.inputElementRef.nativeElement.focus();
        }
    }

    public ngOnDestroy(): void {
        this.focusEvent.complete();
        this.blurEvent.complete();
    }
}
