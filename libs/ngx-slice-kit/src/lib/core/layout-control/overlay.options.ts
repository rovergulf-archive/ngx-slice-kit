export class OverlayOptions {
    overlayIndex: number = 1000;
    hideOnEscape: boolean = true;
    hideOnBackdrop: boolean = true;
    pruneSpaceKey: boolean = true;
    pruneTabKey: boolean = true;


    incrementIndex(): void {
        this.overlayIndex += 1;
    }

    decrementIndex(): void {
        if (this.overlayIndex === 1000) {
            return;
        }
        this.overlayIndex -= 1;
    }


}
