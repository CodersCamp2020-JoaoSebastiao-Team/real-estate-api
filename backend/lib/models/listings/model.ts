import { ModificationNote } from "../common/model";
import {ListingStatus, EstateTypes, ListingStatusTypes} from './enums'
import {IReservation} from '../reservations/model'
export interface IListing {
    _id?: String;
    description: String;
    country: String;
    city: String;
    street: String;
    zipCode: String;
    images: String[];
    status: ListingStatus;
    listingStatusType: ListingStatusTypes;
    estateType: EstateTypes;
    reservation?: IReservation;
    user_id: String;
    modification_notes: ModificationNote[]
}

export const IListing = {
    _id: String,
    description: String,
    country: String,
    city: String,
    street: String,
    zipCode: String,
}