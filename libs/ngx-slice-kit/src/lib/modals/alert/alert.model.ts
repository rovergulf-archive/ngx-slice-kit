import { EventEmitter } from '@angular/core';

export class AlertOptions {
    public $action?: EventEmitter<any>;

    public message: string = 'Something went wrong';
    public title?: string = 'Unexpected error';
    public timeout?: number = 5000;
    public type?: AlertType = 'error';
    public customIcon?: string;
    public small?: boolean = false;
    public action?: boolean = false;
    public actionText?: string = 'Done.';
    public positionX?: AlertXPosition = 'right';
    public positionY?: AlertYPosition = 'top';
    public refName?: string = 'top-right';
    public index?: number;
    public active?: boolean;

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
    public index?: number;
    public actionTriggered?: boolean;
}

export type AlertType = 'error' | 'success' | 'default';
export type AlertXPosition = 'left' | 'center' | 'right';
export type AlertYPosition = 'top' | 'bottom';
