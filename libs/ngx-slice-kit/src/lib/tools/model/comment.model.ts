export class Comment {
    comment_id?: number;
    uuid?: string;
    owner_id?: number;
    owner_name?: string;
    owner_image?: string;

    created_at?: number;
    updated_at?: number;

    created_at_date?: Date;
    updated_at_date?: Date;

    constructor(c: Comment) {
        Object.assign(this, c);

        this.created_at_date = new Date(c.created_at * 1000);
        this.updated_at_date = new Date(c.updated_at * 1000);
    }
}
