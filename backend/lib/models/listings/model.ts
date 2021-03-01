import { ModificationNote } from "../common/model";
import {ListingStatus} from './enums'
import {IReservation} from '../reservations/model'
export interface IListing {
    _id?: String;
    description: number;
    country: String;
    city: String;
    street: String;
    zipCode: String;
    images: String[];
    status: ListingStatus;
    reservation: IReservation|null;
    modification_notes: ModificationNote[]
}