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

    @Input() public set required(val: any) {
        this.req = val === '' || val === true;
    }

    public get required(): any {
        return this.req;
    }

    @Input()
    public placeholder: string = '';

    @Input() public tabindex: number = undefined;
    @Input() public minHeight: number = 76;
    @Input() public maxHeight: number = 280;
    @Input() public small: boolean;
    @Input() public label: string;
    @Input() public caption: string;
    @Input() public resizable: boolean = true;

    @Input() @HostBinding('class.sdk-textarea--warn')
    public error: string;

    @Input() @HostBinding('class.disabled')
    public disabled: boolean;

    @Input() @HostBinding('class.full-width')
    public fullWidth: boolean = false;

    @Output() public focusEvent: EventEmitter<any> = new EventEmitter();
    @Output() public blurEvent: EventEmitter<any> = new EventEmitter();

    @ViewChild('clone', {static: false}) public elementClone: ElementRef;
    @ViewChild('textarea', {static: true}) public textarea: ElementRef;

    public value: string = undefined;
    public focused: boolean = false;
    public rows: number = 3;

    public textareaId: string = this.layoutControlService.generateLayoutElementHash();

    constructor(
        private layoutControlService: LayoutControlService,
        private elementRef: ElementRef,
        private themeService: ThemeService,
    ) {
    }

    public ngOnInit(): void {
        if (this.disabled && this.resizable) {
            this.resizable = false;
        }

        if (this.fullWidth) {
            const parentElWidth = this.elementRef.nativeElement.parentElement.offsetWidth;
            this.textarea.nativeElement.style.width = `${parentElWidth}px`;
        }
    }

    public onFocus(): void {
        const event = {
            target: this.elementRef.nativeElement,
            eventName: 'focus',
            value: this.value || ''
        };
        this.focused = true;
        this.focusEvent.emit(event);
    }

    public onBlur(): void {
        const event = {
            target: this.elementRef.nativeElement,
            eventName: 'blur',
            value: this.value || ''
        };
        this.focused = false;
        this.blurEvent.emit(event);
    }

    public change(target): void {
        this.writeValue(target.value);
        this.onTouched();
        this.elementClone.nativeElement.innerText = target.value.replace(/\n^ *$/gm, '\n-');
    }

    public writeValue(value: any): void {
        this.value = value;
        this.onChange(this.value);
    }

    public onChange(value): void {
    }

    public onTouched(): void {
    }

    public isEmpty(): boolean {
        return !this.value || this.value.length < 1;
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

    public ngOnDestroy(): void {
        this.focusEvent.complete();
        this.blurEvent.complete();
    }

}
