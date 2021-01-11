import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { NotificationsCounts } from "../../tools/model";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    private $counts: BehaviorSubject<NotificationsCounts> = new BehaviorSubject<NotificationsCounts>({
        feed_count: 0,
        invites_count: 0
    });

    public get notificationsCount(): number {
        return this.counts.feed_count + this.counts.invites_count;
    }

    public get counts(): NotificationsCounts {
        return this.$counts.getValue();
    }

    public set counts(c: NotificationsCounts) {
        this.$counts.next(c);
    }

    get url(): string {
        return this.counts.feed_count === 0 && this.counts.invites_count > 0 ? 'feed/invites' : 'feed';
    }

    loading: boolean;

    constructor(
        private api: ApiService,
    ) {
    }

    getCounts(): void {
        if (this.loading) {
            return;
        }
        this.loading = true;

        this.api.get(`events/feed/counts`).subscribe(
            (res: NotificationsCounts) => {
                this.counts = res;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    pushMessage(message: any): void {
    }

    handleWsMessage(message: any): void {
        const counts = this.counts
        if (message?.event) {
            counts.feed_count += 1;
        }
        if (message?.invite) {
            counts.invites_count += 1;
        }

        this.counts = counts;
    }

}
