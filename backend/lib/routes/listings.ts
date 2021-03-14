import { Application, Request, Response } from 'express';
import { ListingController } from '../controllers/listingController';
const verify = require('../middlewares/verifyToken')


export class Listing {
    private reservation_controller: ListingController = new ListingController();

    public route(app: Application) {

        app.post('/api/listing', verify,  (req: Request, res: Response) => {
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

        app.put('/api/listing/:id', verify, (req: Request, res: Response) => {
            this.reservation_controller.update_listing(req, res);
        });

        app.delete('/api/listing/:id', verify, (req: Request, res: Response) => {
            this.reservation_controller.delete_listing(req, res);
        });

    }
}