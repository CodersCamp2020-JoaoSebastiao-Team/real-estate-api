import { ModificationNote, AnnouncementStatus } from "../common/model";
export interface IUser {
    _id?: String;
    name: String;
    surname: String;
    modification_notes: ModificationNote[]
}

export const IUser = {
    _id: String,
    name: String,
    surname: String,
}

export interface IAnnouncement {
    _id?: String;
    description: String;
    country: String;
    city: String;
    street: String;
    zipCode: String;
    images: String[];
    status: AnnouncementStatus;
    modification_notes: ModificationNote[]
}

export const IAnnouncement = {
    _id: String,
    description: String,
    country: String,
    city: String,
    street: String,
    zipCode: String
}
export interface IReservation {
    _id?: String;
    user: IUser;
    announcement: IAnnouncement;
    u_note: String;
    modification_notes: ModificationNote[]
}