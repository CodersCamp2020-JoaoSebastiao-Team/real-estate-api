import { ModificationNote } from "../common/model";
import { IListing } from "../listings/model"
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
export interface IReservation {
    _id?: String;
    user: IUser;
    announcement: IListing;
    u_note: String;
    modification_notes: ModificationNote[]
}