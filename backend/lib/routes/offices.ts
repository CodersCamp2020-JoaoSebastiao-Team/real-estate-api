import { Application, Request, Response } from 'express';
import { OfficeController } from '../controllers/officeController';

export class Office {

    private office_controller: OfficeController = new OfficeController();

    public route(app: Application) {
        app.post('/api/office', (req: Request, res: Response) => {
            this.office_controller.create_office(req, res);
        });

        app.get('/api/office', (req: Request, res: Response) => {
            this.office_controller.get_all_office(req, res);
        });

        app.get('/api/office/:id', (req: Request, res: Response) => {
            this.office_controller.get_office(req, res);
        });

        app.put('/api/office/:id', (req: Request, res: Response) => {
            this.office_controller.update_office(req, res);
        });

        app.delete('/api/office/:id', (req: Request, res: Response) => {
            this.office_controller.delete_office(req, res);
        });

    }
}