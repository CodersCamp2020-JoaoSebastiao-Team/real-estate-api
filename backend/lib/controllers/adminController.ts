import { Request, Response } from 'express';
import accountSchema from '../models/account/schema';
import crypto from 'crypto';
import passport from 'passport';
import { nextTick } from 'node:process';

const bcrypt: any = require('bcryptjs');
const jwt: any = require('jsonwebtoken');
const mail:any = require('../handlers/mail');


export class AdminController {

}