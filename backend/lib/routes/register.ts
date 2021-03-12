import { Application, Request, Response } from 'express';
import { find } from 'shelljs';
import accountSchema from '../models/account/schema'
const bcrypt: any = require('bcryptjs');
const jwt: any = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');



export class Register {
    
    public route(app: Application) {
        
        app.post('/api/register',async (req:Request, res:Response) =>{
            if(!req.body){
                return res.status(400).send("error")
            }
            const userExist = await accountSchema.findOne({email:req.body.email});
            if(userExist) return res.status(400).send('User with this email already exists');
            
            const salt = await bcrypt.genSalt(8);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);
        
      
            const account = new accountSchema({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
             })
             try{
                const savedAccount = await account.save();
                res.send(savedAccount);
            }catch(err){
                res.status(400).send("errrrror "+err);
            }
            
        });
        app.post('/api/login', async (req:Request, res:Response) =>{
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
                 return res.status(400).send('Password is wrong');
            }
   
            const token: any = jwt.sign({_id:user._id},"process.env.TOKEN_SECRET");
          
            res.header('jwt',token)
            res.send(token);
            res.status(200).send("success");


        }
           
        });
        app.get('/api/register', verifyToken, async (req:Request, res:Response)=>{  
            const users = await accountSchema.find();
            res.send(users);
        });
    }
}