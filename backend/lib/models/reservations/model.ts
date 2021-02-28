import { ModificationNote } from "../common/model";

export interface IReservation {
    _id?: String;
    date: String;
    modification_notes: ModificationNote[]
}