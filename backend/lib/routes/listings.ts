import { Application, Request, Response } from 'express';
import { ListingController } from '../controllers/listingController';

export class Listing {
    private reservation_controller: ListingController = new ListingController();

    public route(app: Application) {

        app.post('/api/listing', (req: Request, res: Response) => {
            this.reservation_controller.create_listing(req, res);
        });

        app.get('/api/listing', (req: Request, res: Response) => {
            this.reservation_controller.get_listings(req, res);
        });

        app.get('/api/listing/:id', (req: Request, res: Response) => {
            this.reservation_controller.get_listing(req, res);
        });

        app.put('/api/listing/:id', (req: Request, res: Response) => {
            this.reservation_controller.update_listing(req, res);
        });

        app.delete('/api/listing/:id', (req: Request, res: Response) => {
            this.reservation_controller.delete_listing(req, res);
        });

    }
}