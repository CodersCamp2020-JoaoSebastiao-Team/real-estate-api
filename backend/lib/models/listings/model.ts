import { ModificationNote } from "../common/model";
import {ListingStatus, EstateTypes} from './enums'
import {IReservation} from '../reservations/model'
export interface IListing {
    _id?: String;
    description: String;
    country: String;
    city: String;
    street: String;
    zipCode: String;
    images: String[];
    status?: ListingStatus;
    estateType: EstateTypes;
    reservation?: IReservation;
    modification_notes: ModificationNote[]
}