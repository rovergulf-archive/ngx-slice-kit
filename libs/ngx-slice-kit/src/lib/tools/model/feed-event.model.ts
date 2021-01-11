import { User } from "./user.model";
import { Workspace } from "./workspace.model";

export class FeedEvent {
    event_id?: number;
    subscription_id?: number;
    log_id?: number;
    owner: User;
    workspace: Workspace;
}

export class Log {
    log_id?: number;
    user_id?: number;
    workspace_id?: number;
    ref_type?: number;
    ref_id?: number;
    owner_id?: number;
    data?: LogData;

    constructor(l: Log) {
        Object.assign(this, l);
    }
}

export class LogData {
    ref_type?: number;
    ref_id?: number;
    str_val?: string;
    num_val?: number;
    key?: string;
    name?: string;
    description?: string
    extra?: any;
}

export class LogsRequest {
    page?: number = 1;
    limit?: number = 10;
    user_id?: number;
    workspace_id?: number;
    ref_type?: number;
    ref_id?: number;
    owner_id?: number;
}

export class NotificationsCounts {
    messages_count?: number;
    invites_count?: number;
    feed_count?: number;
}
