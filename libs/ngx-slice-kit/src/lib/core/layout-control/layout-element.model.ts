import { Directive, EventEmitter, Output } from '@angular/core';

@Directive()
export class LayoutElement {
    hash?: string;
    state?: 'opened' | 'closed' | 'active' | 'overlay' = 'closed';

    @Output() closed = new EventEmitter<any>();

    get elementHash(): string {
        return this.hash;
    }

    getOuterHeight(el, margin?) {
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

    getInnerHeight(el) {
        let height = el.offsetHeight;
        const style = getComputedStyle(el);

        height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        return height;
    }

    getOffset(el) {
        const rect = el.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }

}
