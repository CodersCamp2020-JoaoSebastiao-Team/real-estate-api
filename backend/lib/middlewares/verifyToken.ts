import { Request, Response } from "express";

const jwt = require('jsonwebtoken');
require('dotenv/config')

interface IGetUserAuthInfoRequest extends Request {
    user: string // or any other type
  }

module.exports = (req: IGetUserAuthInfoRequest, res: Response, next: any)=>{
    const token = req.header('jwt');
    if(!token) return res.status(401).send('Acces Denied');

    try {
        const verified = jwt.verify(token, "process.env.TOKEN_SECRET");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}