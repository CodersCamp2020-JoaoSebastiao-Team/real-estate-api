import { ModificationNote } from "../common/model";
export interface IOffice {
    _id?: String;
    country: String;
    city: String;
    street: String;
    zipCode: String;
    modification_notes: ModificationNote[]
}