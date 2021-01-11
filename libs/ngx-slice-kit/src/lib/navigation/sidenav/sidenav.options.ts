export class SidenavOptions {
    mode?: SidenavMode = 'side';
    width?: number = 320;
    opened?: boolean = false;
    style?: any;

    constructor(o: SidenavOptions) {
        Object.assign(this, o);
    }
}

export type SidenavMode = 'over' | 'side';
export type SidenavState = 'opened' | 'closed';

