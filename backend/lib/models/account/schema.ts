import * as mongoose from 'mongoose';
import validator from 'validator';
import {UserType} from './userType';
import { IOffice } from '../offices/model';
import { Office } from '../../routes/offices';



const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    },
    surname: String,
    username: String, 
    userType: {
        type: UserType
    },
    email: {
        type:String,
        unique: true, 
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please Supply an email address'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    password: String
});

export default mongoose.model('account', accountSchema); //account = user?