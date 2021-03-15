import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    surname: String,
});

export default mongoose.model('user', userSchema);