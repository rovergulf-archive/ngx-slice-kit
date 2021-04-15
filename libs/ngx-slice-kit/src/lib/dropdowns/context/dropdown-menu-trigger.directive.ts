import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, } from '@angular/core';
import { DropdownService } from '../dropdown.service';
import { DropdownOptions } from '../dropdown.model';
import { OptionModel } from '../dropdown-option.model';
import { Subscription } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { OptionsService } from '../options.service';

@Directive({
    selector: '[sdkDropdownMenuTrigger]'
})
export class DropdownMenuTriggerDirective implements OnInit, OnDestroy {

    @Input() options: OptionModel[];
    @Input() fitWidth: boolean;
    // @Input() config: DropdownOptions;

    @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() opened: EventEmitter<any> = new EventEmitter<any>();
    @Output() closed: EventEmitter<any> = new EventEmitter<any>();

    sub: Subscription;
    isOpened: boolean;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private dropdownService: DropdownService,
        private el: ElementRef,
        private optionsService: OptionsService
    ) {
    }

    @HostListener('click') open(): void | undefined {
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

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.resultEvent.complete();
        this.opened.complete();
        this.closed.complete();
        this.sub?.unsubscribe();
        this.optionsService.options = null;
    }

}
