export class Session {
    session_id?: string;
    user_id?: number;
    ip_address?: string;
    user_agent?: string;
    roles?: number;
    expire_time?: number;
    last_activity?: number;

    expire_time_date?: Date;
    last_activity_date?: Date;

    is_expired?: boolean;

    constructor(s: Session) {
        Object.assign(this, s);

        this.expire_time_date = s.expire_time ? new Date(s.expire_time * 1000) : null;
        this.last_activity_date = s.last_activity ? new Date(s.last_activity * 1000) : null
        this.is_expired = s.expire_time <= (+new Date() / 1000)
    }
}

export class SessionsRequest {}

export class SessionsResult {
    sessions_count?: number;
    sessions?: {
        string: Session
    } | Session[];
    user_sessions?: { string: string[] };

    constructor(res: SessionsResult) {
        Object.assign(res, this);


        const {sessions} = res;
        if (res.sessions_count > 0) {
            const result = [];
            if (sessions)
            for (const key in sessions) {
                if (sessions.hasOwnProperty(key)) {
                    const s = sessions[key];
                    result.push(new Session(s));
                }
            }

            this.sessions = result;
        }
    }
}

