import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    date: String,
    modification_notes: [ModificationNote]
});

export default mongoose.model('reservations', schema);