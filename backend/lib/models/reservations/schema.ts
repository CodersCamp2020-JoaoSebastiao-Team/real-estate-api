import * as mongoose from 'mongoose';
import { ModificationNote} from '../common/model';
import { IUser, IAnnouncement } from '../reservations/model';
const Schema = mongoose.Schema;

const schema = new Schema({
    user: IUser,
    announcement: IAnnouncement,
    modification_notes: [ModificationNote]
});

export default mongoose.model('reservations', schema);