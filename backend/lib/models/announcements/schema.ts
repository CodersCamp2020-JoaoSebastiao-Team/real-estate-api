import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';
import {AnnouncementStatus} from './enums'

const Schema = mongoose.Schema;

const schema = new Schema({
    description: Number,
    country: String,
    city: String,
    street: String,
    zipCode: String,
    imagens: [String],
    status: {
        type: String,
        enum: AnnouncementStatus
    },
    reservation: {
       type: Schema.Types.ObjectId,
       required: false,
       ref: 'reservations'
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('announcements', schema);