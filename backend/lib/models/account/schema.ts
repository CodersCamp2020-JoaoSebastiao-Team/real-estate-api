import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    email: {
        type:String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: String
});

export default mongoose.model('account', accountSchema);