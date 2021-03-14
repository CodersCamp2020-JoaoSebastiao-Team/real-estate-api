import { Application, Request, Response } from 'express';
import { AdminController } from '../controllers/adminController';

const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');

export class Admin {
    private admin_controller: AdminController = new AdminController();

    public route(app: Application) {
        
        app.get('/admin/add-listing', isAuth, async (req:Request, res:Response) =>{
          this.admin_controller.create_listing(req, res);
        });

        app.get('/admin/listings', isAuth, async (req:Request, res:Response) =>{
           this.admin_controller.get_all_listings(req,res);
        });

        app.post('/admin/add-listing', isAuth, async (req:Request, res:Response)=>{  
          this.admin_controller.create_listing(req,res);
       });

        app.delete('/admin/listing/:id', isAuth, async (req:Request, res:Response)=>{  
          this.admin_controller.delete_listing(req,res); 
        });

    }
}
