import { Application, Request, Response } from 'express';
import { ListingController } from '../controllers/listingController';
const isLoggedIn = require('../middlewares/verifyToken');
const isAuthor = require('../middlewares/verifyTokenOwner');


const stripe = require('stripe')('secret key');

export class Listing {
    private reservation_controller: ListingController = new ListingController();

    public route(app: Application) {

        app.post('/api/listing', isLoggedIn,  (req: Request, res: Response) => {
            this.reservation_controller.create_listing(req, res);
        });

        app.get('/api/listing', (req: Request, res: Response) => {
            this.reservation_controller.get_all_listings(req, res);
        });

        app.get('/api/listing/available', (req: Request, res: Response) => {
            this.reservation_controller.get_all_available_listings(req, res);
        });

        app.get('/api/listing/:id', (req: Request, res: Response) => {
            this.reservation_controller.get_listing(req, res);
        });

        app.put('/api/listing/:id', isAuthor, (req: Request, res: Response) => {
            this.reservation_controller.update_listing(req, res);
        });

        app.delete('/api/listing/:id', isAuthor, (req: Request, res: Response) => {
            this.reservation_controller.delete_listing(req, res);
        });

        app.post('/api/listing/order', isLoggedIn, (req: Request, res: Response) => {
            this.reservation_controller.listing_payment(req, res);
        });

        // app.post('/api/listing/order', isLoggedIn, token({ required: true }), (req: Request, res: Response) => {
        //     this.reservation_controller.createChargeStripe(req, res);
        // });

    }
}