export class LayoutOptions {
    public overlayIndex?: number = 1000;
    public hideOnEscape?: boolean = false;
    public hideOnBackdrop?: boolean = false;
    public pruneSpaceKey?: boolean = true;
    public pruneTabKey?: boolean = true;
    public pruneEscapeKey?: boolean = true;
    public pruneEnterKey?: boolean = true;

    public get pruneAnyKey(): boolean {
        return this.pruneEnterKey && this.pruneSpaceKey && this.pruneTabKey && this.pruneEscapeKey;
    }

    public incrementIndex(): void {
        this.overlayIndex += 1;
    }

    public decrementIndex(): void {
        if (this.overlayIndex === 1000) {
            return;
        }
        this.overlayIndex -= 1;
    }
}
