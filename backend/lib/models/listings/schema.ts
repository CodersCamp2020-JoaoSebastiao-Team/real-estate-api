import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';
import {ListingStatus, EstateTypes, ListingStatusTypes} from './enums'

const Schema = mongoose.Schema;

const schema = new Schema({
    description: String,
    country: String,
    city: String,
    street: String,
    zipCode: String,
    images: [String],
    status: {
        type: String,
        enum: ListingStatus,
    },
    listingStatusType: {
        type: String,
        enum: ListingStatusTypes
    },
    estateType: {
      type: String,
      enum: EstateTypes
    },
    reservation: {
       type: Schema.Types.ObjectId,
       required: false,
       ref: 'reservations'
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('listings', schema);