import { EventEmitter, OnInit, Output } from '@angular/core';
import { LayoutControlService } from './layout-control.service';

export class LayoutElement implements OnInit {
    hash?: string;
    state?: 'opened' | 'closed' | 'active' | 'overlay' = 'closed';

    @Output() closed = new EventEmitter<any>();

    constructor(
        private layoutControl: LayoutControlService
    ) {
    }

    get elementHash(): string {
        return this.hash;
    }

    getOuterHeight(el, margin?): number {
        let height = el.offsetHeight;

        if (margin) {
            const style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
    }

    getHeight(el): number {
        let height = el.offsetHeight;
        const style = getComputedStyle(el);

        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) +
            parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

        return height;
    }

    getWidth(el): number {
        let width = el.offsetWidth;
        const style = getComputedStyle(el);

        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) +
            parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

        return width;
    }

    getInnerHeight(el): number {
        let height = el.offsetHeight;
        const style = getComputedStyle(el);

        height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        return height;
    }

    getOffset(el): {
        top: number,
        left: number
    } {
        const {top, left} = el.getBoundingClientRect();

        return {
            top: (top || 0) + document.body.scrollTop,
            left: (left || 0) + document.body.scrollLeft
        };
    }


    ngOnInit(): void {
        this.hash = this.layoutControl.generateLayoutElementHash();
    }

}
