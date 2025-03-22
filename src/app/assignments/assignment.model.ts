export class Assignment {
    _id!: string;
    nom!: string;
    dateDeRendu!: Date;
    rendu!: boolean;

    constructor(init?: Partial<Assignment>) {
        Object.assign(this, init);
    }

    get id(): string {
        return this._id;
    }
}