import { Application, Request, Response } from 'express';
import { ReservationController } from '../controllers/reservationController';

export class Reservation {

    private reservation_controller: ReservationController = new ReservationController();

    public route(app: Application) {
        
        app.post('/api/reservation', (req: Request, res: Response) => {
            this.reservation_controller.create_reservation(req, res);
        });

        app.get('/api/reservation', (req: Request, res: Response) => {
            this.reservation_controller.get_all_reservation(req, res);
        });

        app.get('/api/reservation/:id', (req: Request, res: Response) => {
            this.reservation_controller.get_reservation(req, res);
        });

        app.put('/api/reservation/:id', (req: Request, res: Response) => {
            this.reservation_controller.update_reservation(req, res);
        });

        app.delete('/api/reservation/:id', (req: Request, res: Response) => {
            this.reservation_controller.delete_reservation(req, res);
        });

    }
}