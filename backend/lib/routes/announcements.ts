import { Application, Request, Response } from 'express';
import { AnnouncementController } from '../controllers/announcementController';

export class Announcement {
    private reservation_controller: AnnouncementController = new AnnouncementController();

    public route(app: Application) {

        app.post('/api/announcement', (req: Request, res: Response) => {
            this.reservation_controller.create_announcement(req, res);
        });

        app.get('/api/announcement/:id', (req: Request, res: Response) => {
            this.reservation_controller.get_announcement(req, res);
        });

        app.put('/api/announcement/:id', (req: Request, res: Response) => {
            this.reservation_controller.update_announcement(req, res);
        });

        app.delete('/api/announcement/:id', (req: Request, res: Response) => {
            this.reservation_controller.delete_announcement(req, res);
        });

    }
}