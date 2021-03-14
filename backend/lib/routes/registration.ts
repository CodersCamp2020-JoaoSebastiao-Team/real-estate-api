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
    }
}