export class SidenavOptions {
    public mode?: SidenavMode = 'side';
    public width?: number = 320;
    public opened?: boolean = false;
    public style?: any;

    constructor(o: SidenavOptions) {
        Object.assign(this, o);
    }
}

export type SidenavMode = 'over' | 'side';
export type SidenavState = 'opened' | 'closed';

