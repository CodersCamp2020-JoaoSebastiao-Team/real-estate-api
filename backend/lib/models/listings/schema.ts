import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';
import {ListingStatus, EstateTypes, ListingStatusTypes} from './enums'

const Schema = mongoose.Schema;

const schema = new Schema({
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500
    },
    country: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    street: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    zipCode: {
        type: String,
        required: true,
        validate: {
            validator: (v:string) => {
                let re = /^\d{2}-\d{3}$/;
                return (v == null || v.trim().length < 1) || re.test(v)
            },
            message: 'Provided zip code number is invalid.'
        },

    },
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
    user_id:{
        type: String,
        required: true
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('listings', schema);