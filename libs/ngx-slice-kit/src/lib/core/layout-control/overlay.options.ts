export class LayoutOptions {
    overlayIndex?: number = 1000;
    hideOnEscape?: boolean = false;
    hideOnBackdrop?: boolean = false;
    pruneSpaceKey?: boolean = true;
    pruneTabKey?: boolean = true;
    pruneEscapeKey?: boolean = true;
    pruneEnterKey?: boolean = true;

    get pruneAnyKey(): boolean {
        return this.pruneEnterKey && this.pruneSpaceKey && this.pruneTabKey && this.pruneEscapeKey;
    }

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
