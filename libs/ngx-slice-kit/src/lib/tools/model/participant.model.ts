export class Participant {
    user_id: number; // required
    workspace_id: number; // required
    role?: number;
    role_name?: string;
    publicity?: number;
    publicity_str?: string;
    flags?: number;

    joined_at?: number;
    joined_at_date?: Date;

    isOwner?: boolean;
    isMaintainer?: boolean;
    isDeveloper?: boolean;
    hasRestrictedAccess?: boolean;

    constructor(p: Participant) {
        Object.assign(this, p);

        this.isOwner = p.role === 1;
        this.isMaintainer = p.role === 2;
        this.isDeveloper = p.role === 3;

        this.role_name = this.isOwner ? `Owner` :
            this.isMaintainer ? `Maintainer` :
                this.isDeveloper ? `Developer` :
                    p.role === 4 ? `Guest` : p.role === 5 ? `Reporter` : `No role. That is not valid.`;

        this.joined_at_date = new Date(p.joined_at * 1000);
    }
}
