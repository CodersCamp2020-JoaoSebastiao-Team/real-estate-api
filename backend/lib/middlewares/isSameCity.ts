import { Request, Response } from "express";
//not finished 

module.exports = (req: Request, res: Response, next: any)=>{
    if(req.body.Listing.city === req.body.user.city) {
        next();
        return;
    }
    return res.status(401).send('You can only access listings from your city');
}