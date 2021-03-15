import { Application, Request, Response } from 'express';
import { AdminController } from '../controllers/adminController';
import { ListingController } from '../controllers/listingController';

const { body } = require('express-validator/check');

const isLoggedIn = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/verifyTokenEmpolyee');

export class Admin {
    //private admin_controller: AdminController = new AdminController();
    private reservation_controller: ListingController = new ListingController();
    
    public route(app: Application) {
        
        app.get('/admin/add-listing', isLoggedIn, async (req:Request, res:Response) =>{
          this.reservation_controller.create_listing(req, res);
        });

        app.get('/admin/listings', isLoggedIn, async (req:Request, res:Response) =>{
           this.reservation_controller.get_all_listings(req,res);
        });

        app.post('/admin/add-listing', isLoggedIn , async (req:Request, res:Response)=>{  
          this.reservation_controller.create_listing(req,res);
       });

       app.post('/admin/add-listing', isAdmin , async (req:Request, res:Response)=>{  
        this.reservation_controller.update_listing(req,res);
     });

        app.delete('/admin/listing/:id', isAdmin, async (req:Request, res:Response)=>{  
          this.reservation_controller.delete_listing(req,res); 
        });

    }
}
