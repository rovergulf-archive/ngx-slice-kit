import { EventEmitter } from '@angular/core';

export class AlertOptions {
    $action?: EventEmitter<any>;

    message: string = 'Something went wrong';
    title?: string = 'Unexpected error';
    timeout?: number = 5000;
    type?: AlertType = 'error';
    customIcon?: string;
    small?: boolean = false;
    action?: boolean = false;
    actionText?: string = 'Done.';
    positionX?: AlertXPosition = 'right';
    positionY?: AlertYPosition = 'top';
    refName?: string = 'top-right';
    index?: number;
    active?: boolean;

    constructor(opts?: AlertOptions) {
        Object.assign(this, opts);

        if (this.action) {
            this.$action = new EventEmitter<any>();
        }

        if (opts.type === 'success') {
            this.title = opts.title ?? 'Success';
            this.message = opts.message ?? 'Well done!';
        }

        this.message = this.message.length > 125 ? `${this.message.substring(0, 128)}...` : this.message;
        this.refName = `${opts?.positionY ?? this.positionY}-${opts?.positionX ?? this.positionX}`;
    }
}

export class AlertResponse {
    index?: number;
    actionTriggered?: boolean;
}

export type AlertType = 'error' | 'success' | 'default';
export type AlertXPosition = 'left' | 'center' | 'right';
export type AlertYPosition = 'top' | 'bottom';
