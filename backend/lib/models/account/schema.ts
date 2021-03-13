import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    email: {
        type:String,
        unique: true,
        lowercase: true,
        trim: true,
        //validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please Supply an email address'
    },
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    password: String
});

export default mongoose.model('account', accountSchema);