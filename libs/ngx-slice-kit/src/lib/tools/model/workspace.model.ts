import { User } from "./user.model";
import { Participant } from "./participant.model";

export class Workspace {
    uuid?: string;
    workspace_id?: number;
    shortlink?: string;
    owner_id?: number;
    name?: string;
    description?: string;
    image?: string;
    parent_id?: number;
    publicity?: number;
    publicity_str?: string;
    color?: string;

    is_active?: boolean;
    roles?: number;
    flags?: number;

    created_at?: number;
    updated_at?: number;
    created_at_date?: Date;
    updated_at_date?: Date;

    participant?: Participant;
    current_user?: Participant;

    imageUrl?: string;
    imageText?: string;
    backgroundUrl?: string;
    backgroundUrl2?: string;

    extra?: any; // this can be implemented as additional fields

    url?: string;

    constructor(w: Workspace) {
        Object.assign(this, w);

        if (w.current_user) {
            this.current_user = new Participant(w.current_user);
        }

        if (w.participant) {
            this.participant = new Participant(w.participant);
        }

        this.created_at_date = new Date(w.created_at * 1000);
        this.updated_at_date = new Date(w.updated_at * 1000);
        this.publicity_str = w.publicity === 1 ? 'Public' : 'Private';

        let names = w.name.split(' ');
        if (names.length > 2) {
            names = [names[0], names[1]];
        }
        this.imageText = names.map(w => {
                return w.substring(0,1).toUpperCase();
            }).join('');

        this.url = w.shortlink ? w.shortlink : `id${w.workspace_id}`;
    }
}

export class WorkspacesRequest {
    page?: number = 1;
    limit?: number = 10;
    publicity?: number;
    name?: string;
    shortlink?: string;
    owner_id?: number;
    participant_id?: number;
    created_from?: number;
    created_until?: number;
    restricted?: boolean;
}

export class ParticipantsRequest {
    page?: number = 1;
    limit?: number = 10;
    name?: string;
    joined_from?: number;
    joined_until?: number;
}

export const WORKSPACE_PUBLICITY = {
    1: 'Public',
    2: 'Private',
}

export const WORKSPACE_ROLES = {
    0: 'None',
    1: 'Owner',
    2: 'Maintainer',
    3: 'Developer',
    4: 'Reporter',
    5: 'Guest',
};

