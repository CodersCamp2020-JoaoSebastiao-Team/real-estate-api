import {ModificationNote} from "../common/model";
import {ListingStatus, EstateTypes, ListingStatusTypes} from './enums'
import {IUser} from '../reservations/model'

export interface IListing {
    _id?: String;
    price?: Number;
    livingSpace?: Number;
    bedrooms?: String;
    description: String;
    country: String;
    city: String;
    street: String;
    zipCode: String;
    images: String[];
    status: ListingStatus;
    listingStatusType: ListingStatusTypes;
    estateType: EstateTypes;
    author: IUser;
    modification_notes: ModificationNote[]
}

export const IListing = {
    _id: String,
    price: Number,
    livingSpaces: Number,
    bedrooms: String,
    description: String,
    country: String,
    city: String,
    street: String,
    zipCode: String,
    images: [String],
    status: {
        type: String,
        enum: ListingStatus
    },

    listingStatusType: {
        type: String,
        enum: ListingStatusTypes
    },
    estateType: {
        type: String,
        enum: EstateTypes
    },
}