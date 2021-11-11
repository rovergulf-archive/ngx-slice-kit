import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, Output, PLATFORM_ID, } from '@angular/core';
import { DropdownService } from '../dropdown.service';
import { DropdownOptions } from '../dropdown.model';
import { OptionModel } from '../dropdown-option.model';
import { Subscription } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { OptionsService } from '../options.service';

@Directive({
    selector: '[sdkDropdownMenuTrigger]'
})
export class DropdownMenuTriggerDirective implements OnDestroy {

    @Input() public options: OptionModel[];
    @Input() public fitWidth: boolean;
    // @Input() public config: DropdownOptions;

    @Output() public resultEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() public opened: EventEmitter<any> = new EventEmitter<any>();
    @Output() public closed: EventEmitter<any> = new EventEmitter<any>();

    public sub: Subscription;
    public isOpened: boolean;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private dropdownService: DropdownService,
        private el: ElementRef,
        private optionsService: OptionsService
    ) {
    }

    @HostListener('click')
    public open(): void | undefined {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        if (this.isOpened) {
            return;
        }
        this.isOpened = true;
        this.opened.emit();

        this.optionsService.options = this.options;

        const opts: DropdownOptions = {
            triggerRect: this.el.nativeElement.getBoundingClientRect(),
            fitWidth: this.fitWidth,
            multi: false
        };

        this.dropdownService.showDropdown(opts).subscribe(res => {
            this.isOpened = false;
            this.closed.emit();

            if (res) {
                this.resultEvent.emit(res);
            }
        });
    }

    public ngOnDestroy(): void {
        this.resultEvent.complete();
        this.opened.complete();
        this.closed.complete();
        this.sub?.unsubscribe();
        this.optionsService.options = null;
    }

}
