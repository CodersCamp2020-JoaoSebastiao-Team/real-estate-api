import * as mongoose from 'mongoose';
import { ModificationNote} from '../common/model';
import { IUser } from '../reservations/model';
import { IListing } from "../listings/model"
const Schema = mongoose.Schema;

const schema = new Schema({
    user: IUser,
    announcement: IListing,
    modification_notes: [ModificationNote]
});

export default mongoose.model('reservations', schema);