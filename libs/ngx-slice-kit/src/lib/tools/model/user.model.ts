import { Workspace } from "./workspace.model";
import { Participant } from "./participant.model";
import { environment } from "../../environments/environment";

export class User {
    user_id?: number;
    UUID?: string;
    shortlink?: string;
    name?: string;
    full_name?: string;
    image?: string;
    imageUrl?: string;
    image192Url?: string;
    image640Url?: string;
    background?: string;
    backgroundUrl?: string;
    background960Url?: string;
    public_email?: string;
    phone?: string;
    website?: string;
    language?: string;
    color?: string;
    publicity?: number;
    rank?: string;

    roles?: number;
    flags?: number;

    created_at?: number;
    created_at_date?: Date;
    updated_at?: number;
    updated_at_date?: Date;

    url: string;
    is_sayan?: boolean;
    is_maintainer?: boolean;
    is_developer?: boolean;
    is_moderator?: boolean;
    is_tester?: boolean;
    is_publisher?: boolean;
    hasRestrictedAccess?: boolean;
    project_role?: number;
    team_role?: number;
    publicity_str?: string;
    role_str?: string;

    workspaces?: Workspace[];
    participants?: Participant[];
    participant?: Participant;

    settings?: any;

    get workspaceOptions(): { id, value }[] {
        return this.workspaces.map(w => {
            return {
                id: w.workspace_id,
                value: w.name,
            }
        })
    }

    get participantOptions(): { id, value }[] {
        return this.workspaces.map(w => {
            return {
                id: w.current_user.user_id,
                value: w.current_user.role_name
            }
        });
    }

    constructor(u: User) {
        Object.assign(this, u);
        this.is_sayan = (u.roles & 1) > 0;
        this.is_maintainer = (u.roles & 2) > 0;
        this.is_developer = (u.roles & 4) > 0;
        this.is_moderator = (u.roles & 8) > 0;
        this.is_tester = (u.roles & 16) > 0;
        this.is_publisher = (u.roles & 32) > 0;
        this.hasRestrictedAccess = this.is_sayan || this.is_maintainer || this.is_developer;
        this.role_str = this.is_sayan ? 'Super Sayan' :
            this.is_developer ? 'Developer' :
                this.is_maintainer ? 'Maintainer' :
                    this.is_moderator ? 'Moderator' :
                        this.is_tester ? 'Tester' : 'No roles';

        this.created_at_date = u.created_at ? new Date(u.created_at * 1000) : null;
        this.updated_at_date = u.updated_at ? new Date(u.updated_at * 1000) : null;
        this.publicity_str = u.publicity === 1 ? 'Public' : 'Private';

        this.url = u.shortlink?.length > 0 ? u.shortlink : `id${u.user_id}`;
        if (u.workspaces?.length > 0) {
            this.workspaces = u.workspaces.map(w => new Workspace(w));
        }

        if (!!u.participant) {
            this.participant = new Participant(u.participant);
        }

        if (u.participants?.length > 0) {
            this.participants = u.participants.map(p => new Participant(p));
        }

        this.imageUrl = u.image ? `${environment.imagesUrl}${u.image}_384.png` : '';
        this.image640Url = u.image ? `${environment.imagesUrl}${u.image}_640.png` : '';
        this.image192Url = u.image ? `${environment.imagesUrl}${u.image}_192.png` : '';
        this.backgroundUrl = u.background ? `${environment.imagesUrl}${u.background}.png` : '';
        this.background960Url = u.background ? `${environment.imagesUrl}${u.background}_960.png` : '';
    }

    hasWorkspaceAccess(workspaceId: number): boolean {
        if (this.hasRestrictedAccess) {
            return true;
        }

        return !!this.workspaces.find(w => w.workspace_id === workspaceId);
    }

    hasRestrictedWorkspaceAccess(workspaceId: number): boolean {
        if (this.hasRestrictedAccess) {
            return true;
        }

        const workspace = this.workspaces.find(w => w.workspace_id === workspaceId);
        if (!workspace) {
            return false;
        }

        const user = workspace.current_user;
        return user.role > 0 && user.role < 4;
    }
}

export class UsersRequest {
    page?: number = 1;
    limit?: number = 10;
    publicity?: number;
    name?: string;
    shortlink?: string;
    email?: string;
    created_from?: number;
    created_until?: number;
}

