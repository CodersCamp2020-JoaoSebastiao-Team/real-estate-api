import * as mongoose from 'mongoose';
import { ModificationNote} from '../common/model';
const Schema = mongoose.Schema;

const schema = new Schema({
    country: String,
    city: String,
    street: String,
    zipCode: String,
    modification_notes: [ModificationNote]
});

export default mongoose.model('offices', schema);