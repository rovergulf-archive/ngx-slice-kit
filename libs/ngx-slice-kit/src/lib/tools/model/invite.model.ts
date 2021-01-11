import { User } from "./user.model";
import { Workspace } from "./workspace.model";

export class Invite {
    invite_id?: number;
    uuid?: string;
    owner_id?: number;
    workpace_id?: number;
    ref_type?: number;
    ref_id?: number;
    type?: number;
    roles?: number;
    flags?: number;
    email?: string;
    token?: string;
    user_id?: number;
    status?: number;
    period?: number;

    created_at?: number;
    updated_at?: number;
    expires_at?: number;

    created_at_date?: Date;
    updated_at_date?: Date;
    expires_at_date?: Date;

    owner?: User;
    workspace?: Workspace;

    status_str?: string;

    constructor(i: Invite) {
        Object.assign(this, i);

        this.created_at_date = i.created_at ? new Date(i.created_at * 1000) : null;
        this.updated_at_date = i.updated_at ? new Date(i.updated_at * 1000) : null;
        this.expires_at_date = i.expires_at ? new Date(i.expires_at * 1000) : null;

        switch (i.status) {
            case 2:
                this.status_str = `Opened`;
                break;
            case 4:
                this.status_str = `Read`;
                break;
            case 5:
                this.status_str = `Accepted`;
                break;
            case 6:
                this.status_str = `Declined`;
                break;
            case 11:
                this.status_str = `Completed`;
                break;
            default:
                this.status_str = `Unknown ${i.status}`;
        }

        if (!!i.owner) {
            this.owner = new User(i.owner);
        }

        if (!!i.workspace) {
            this.workspace = new Workspace(i.workspace);
        }
    }

}

export class InvitesRequest {
    page?: number = 1;
    limit?: number = 10;
    owner_id?: number;
    user_id?: number;
    workspace_id?: number;
    token?: string;
    search_str?: string;
    restricted?: boolean;
    search_mode?: 1 | 2;
}
