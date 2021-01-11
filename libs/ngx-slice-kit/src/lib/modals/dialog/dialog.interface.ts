export class DialogInterface {
    /**
     * provide data in any format, default 'null'
     */
    data?: any = null;

    /**
     * hide dialog on backdrop click, default 'true'
     */
    hideOnBackdrop?: boolean = true;

    /**
     * hide dialog on Esc keyup event, default 'true'
     */
    hideOnEscape?: boolean = true;

    /**
     * specify dialog content window border-radius, default '0'
     */
    borderRadius?: number = 0;

    /**
     * disable dialog content scroll, defaults to 'false'
     */
    disableScroll?: boolean = false;

    styles?: any;
}
