import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[sdkTooltip]'
})
export class TooltipDirective {
    @Input() showOnClick: boolean = false;
    @Input() delay: string | number;
    @Input('sdkTooltip') message: string;
    @Input() position: string = 'top';
    @Input() offset: number = 12;

    tooltip: HTMLElement;
    tooltipContent: HTMLElement;

    showTimeout;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
    }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        if (!this.tooltip && !this.showOnClick) {
            this.show();
        }
    }

    @HostListener('click')
    onClick(): void {
        if (!this.tooltip && this.showOnClick) {
            this.show();
        }
    }

    @HostListener('mousewheel')
    @HostListener('mouseleave')
    onMouseLeave(): void {
        if (this.tooltip) {
            this.hide();
        } else {
            clearTimeout(this.showTimeout);
        }
    }

    show(): void {
        this.showTimeout = window.setTimeout(() => {
            this.create();
            this.setPosition();
            this.renderer.addClass(this.tooltip, 'sdk-tooltip-show');
        }, Number(this.delay));
    }

    hide(): void {
        this.renderer.removeClass(this.tooltip, 'sdk-tooltip-show');
        this.renderer.removeChild(document.body, this.tooltip);
        this.tooltip = null;
        // window.setTimeout(() => {
        //     this.renderer.removeChild(document.body, this.tooltip);
        //     this.tooltip = null;
        // }, Number(this.delay));
    }

    create(): void {
        this.tooltip = this.renderer.createElement('div');
        this.tooltipContent = this.renderer.createElement('p');

        this.renderer.appendChild(
            this.tooltipContent,
            this.renderer.createText(this.message)
        );

        this.renderer.appendChild(this.tooltip, this.tooltipContent);
        this.renderer.appendChild(document.body, this.tooltip);

        this.renderer.addClass(this.tooltip, 'sdk-tooltip');
        this.renderer.addClass(this.tooltip, `sdk-tooltip--${this.position}`);
        this.renderer.addClass(this.tooltipContent, 'sdk-tooltip__content');
    }

    setPosition(): void {
        const hostPos = this.el.nativeElement.getBoundingClientRect();
        const tooltipPos = this.tooltip.getBoundingClientRect();
        const tooltipHeight = this.tooltip.offsetHeight;
        const tooltipWidth = this.tooltip.offsetWidth;
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let top;
        let left;

        this.offset = Number(this.offset);

        if (this.position === 'top') {
            const options = {
                hostPosition: hostPos.y,
                hostSize: hostPos.height,
                tooltipSize: tooltipHeight
            };
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
            if (this.checkOversize(options, 'height', false)) {
                top = hostPos.top - tooltipHeight - this.offset;
            } else {
                this.changePosition('top', 'bottom');
                this.setPosition();
            }
        }

        if (this.position === 'bottom') {
            const options = {
                hostPosition: hostPos.y,
                hostSize: hostPos.height,
                tooltipSize: tooltipHeight
            };
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
            if (this.checkOversize(options, 'height')) {
                top = hostPos.bottom + this.offset;
            } else {
                this.changePosition('bottom', 'top');
                this.setPosition();
            }
        }

        if (this.position === 'left') {
            const options = {
                hostPosition: hostPos.x,
                hostSize: hostPos.width,
                tooltipSize: tooltipWidth
            };
            top = hostPos.top + (hostPos.height - tooltipHeight) / 2;
            if (this.checkOversize(options, 'width', false)) {
                left = hostPos.left - tooltipWidth - this.offset;
            } else {
                this.changePosition('left', 'right');
                this.setPosition();
            }
        }

        if (this.position === 'right') {
            const options = {
                hostPosition: hostPos.x,
                hostSize: hostPos.width,
                tooltipSize: tooltipWidth
            };
            top = hostPos.top + (hostPos.height - tooltipHeight) / 2;
            if (this.checkOversize(options, 'width')) {
                left = hostPos.right + this.offset;
            } else {
                this.changePosition('right', 'left');
                this.setPosition();
            }
        }

        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }

    changePosition(oldPosition, newPosition): void {
        this.position = newPosition;
        this.renderer.removeClass(this.tooltip, `sdk-tooltip--${oldPosition}`);
        this.renderer.addClass(this.tooltip, `sdk-tooltip--${newPosition}`);
    }

    checkOversize(options, dimension, isDirectionForward = true): boolean {
        const documentPos = document.body.getBoundingClientRect();
        if (isDirectionForward) {
            return options.hostPosition + options.hostSize + options.tooltipSize + this.offset <= documentPos[dimension];
        } else {
            return options.hostPosition - options.hostSize - options.tooltipSize - this.offset > 0;
        }

    }
}
