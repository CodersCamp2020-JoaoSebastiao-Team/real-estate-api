import { Request, Response } from 'express';
import accountSchema from '../models/account/schema';
import crypto from 'crypto';
import passport from 'passport';
import { nextTick } from 'node:process';
import userSchema from '../models/account/userSchema';
const bcrypt: any = require('bcryptjs');
const jwt: any = require('jsonwebtoken');
const mail:any = require('../handlers/mail');
import {UserType} from '../models/account/userType';


export class AccountController {
    public async create_account(req: Request, res: Response) {
        if(!req.body){
            return res.status(400).send({'error': 'something is wrong'})
        }
        const userExist = await accountSchema.findOne({email:req.body.email});
        if(userExist) return res.status(400).send({'error': 'User with this email already exists'});
        
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
  
        const account = new accountSchema({
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            userType: req.body.userType,
            email: req.body.email,
            password: hashedPassword
         })

         const user = new userSchema({
            name: req.body.name,
            surname: req.body.surname
         })

         try{
            const savedAccount = await account.save();
            const savedUser = await user.save();
            savedUser._id = savedAccount._id;
            res.send({
                'savedAccount':savedAccount,
                'savedUser':savedUser
            }) 
        }catch(err){
            res.status(400).send({"error": err });
        }
    }
    public async login(req: Request, res: Response){
        if(!req.body){
            return res.status(400).send({"error":"please write down email and password"})
         }
        if(!req.body.email){
          return res.status(400).send({"error":"email required"});
        }
        if(!req.body.password){
          return res.status(400).send({"error":"password required"});
        }
        else{
         const user:any = await accountSchema.findOne({email:req.body.email});
         if(!user){
             return res.status(404).send({"error":"user doesn't exist"});
         }
         
         const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
         if(!isPasswordCorrect){
              return res.status(400).send({'error':'Password is wrong'});
         }

        
         const otherToken: any= createToken(user,res);


         const token: any = jwt.sign({_id:user._id, UserType:user.userType}, "process.env.TOKEN_SECRET");

         
         if(otherToken){
            res.header('jwt',token);
            res.header('jwt2',otherToken);
            res.send({
                "jwt":token,
                "jwt2":otherToken
            })
         }
         else{
            res.header('jwt',token)
            res.send(token);
         }
         res.status(200).send({"success": 'logged in'});
        }    
    }

    public async getAllAccount(req: Request, res: Response){
        const users = await accountSchema.find();
        res.send({users});
    }
    public async forgotPassword(req: Request, res: Response){
        //check if user exists
        const user:any = await accountSchema.findOne( {email: req.body.email} );
        if(!user) {
            return res.redirect('/api/login');
        }
        //set reset tokens and  expiry on their account
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordExpires = Date.now() + 18000; // valid for 30mins
        await user.save();
        //send the email with the token
        const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
        await mail.send({
            user,
            subject: 'Password reset',
            resetURL
        });
        //redirect to login page
        res.redirect('/api/login');
    }

    public async resetPassword (req: Request, res: Response) {
        const user: any = await accountSchema.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now()}
        });
        if(!user) {
            return res.redirect('/api/login');
        }
        //if there is a user with the token- show reset password form
        console.log(user);
        res.render('reset'); //nie ma jeszcze
        return res.status(200).send({"success": "you can reset your password"});
    }

    public confirmedPassword (req: Request, res: Response, next:any) {
        if(req.body.password === req.body['password-confirm'] ) {
            next();
            return;
        }
        res.redirect('back');
    }

    public async updatePassword (req: Request, res: Response) {
        const user: any = await accountSchema.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now()}
        });
        if(!user) {
            return res.redirect('/api/login');
        }

        //update the user with the new password
        const salt = await bcrypt.genSalt(8);
        const updatedHashedPassword = await bcrypt.hash(req.body.password,salt);

        const updatedAccount = { ...user, password: updatedHashedPassword};
        user.resetPasswordToken =  undefined;
        user.resetPasswordExpires = undefined;

        await updatedAccount.save();
        res.send(updatedAccount);
        res.redirect('/');

    }
}


function createToken(user: any, res: Response){
    if(user.userType==UserType.employee){
        return jwt.sign({_id:user._id}, "process.env.TOKEN_SECRET_EMPLOYEE");
    }
    else if(user.userType==UserType.owner){
        return jwt.sign({_id:user._id}, "process.env.TOKEN_SECRET_OWNER");
    }
    return null;
}