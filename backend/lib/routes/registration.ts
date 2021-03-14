import { Application, Request, Response } from 'express';
import { find } from 'shelljs';
import accountSchema from '../models/account/schema';
import {AccountController} from '../controllers/accoutController';
const bcrypt: any = require('bcryptjs');
const jwt: any = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');



export class Registration {
    private account_controller: AccountController = new AccountController();

    public route(app: Application) {
        
        app.post('/api/register',async (req:Request, res:Response) =>{
          await this.account_controller.create_account(req, res);
        });
        app.post('/api/login', async (req:Request, res:Response) =>{
           await this.account_controller.login(req, res);
        });

        app.get('/api/register', verifyToken, async (req:Request, res:Response)=>{  
           await this.account_controller.getAllAccount(req, res);
        });

        app.post('/api/forgot',  async (req:Request, res:Response)=>{  
          this.account_controller.forgotPassword(req,res); 
        });

        app.get('/api/reset/:token', async (req:Request, res:Response)=>{  
          this.account_controller.resetPassword(req,res);
        });

        app.post('/api/reset/:token', this.account_controller.confirmedPassword,  async (req:Request, res:Response)=>{  
          this.account_controller.updatePassword(req,res);
        });


    }
}