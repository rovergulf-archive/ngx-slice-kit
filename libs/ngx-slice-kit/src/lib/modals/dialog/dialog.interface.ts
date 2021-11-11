export class DialogInterface {
    /**
     * provide data in any format, default 'null'
     */
    public data?: any = null;

    /**
     * hide dialog on backdrop click, default 'true'
     */
    public hideOnBackdrop?: boolean = true;

    /**
     * hide dialog on Esc keyup event, default 'true'
     */
    public hideOnEscape?: boolean = true;

    /**
     * specify dialog content window border-radius, default '0'
     */
    public borderRadius?: number = 0;

    /**
     * disable dialog content scroll, defaults to 'false'
     */
    public disableScroll?: boolean = false;

    public styles?: any;
}
