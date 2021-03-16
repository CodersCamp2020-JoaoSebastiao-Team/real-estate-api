import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';
import { IOffice } from '../models/offices/model';
import OfficeService from '../models/offices/service';

export class OfficeController {

    private office_service: OfficeService = new OfficeService();

    public async create_office(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.country) {
            const office_params: IOffice = {
                country: req.body.country,
                city: req.body.city,
                street: req.body.street,
                zipCode: req.body.zipCode,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: `null`,
                    modification_note: `null`
                }]
            };
            this.office_service.createOffice(office_params, (err: any, office_data: IOffice) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create office successfull', office_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
        }

    public get_office(req: Request, res: Response) {
        if (req.params.id) {
            let office_filter: any = { _id: req.params.id, };
            this.office_service.filterOffice(office_filter, (err: any, office_data: IOffice) => {
                if (err || office_data === null) {
                    mongoError(err, res);
                }
                else {
                    successResponse('get office successfull from office id', office_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public get_all_office(req: Request, res: Response) {
            let office_filter: any = { __v: 0, };
            this.office_service.findAllOffices(office_filter, (err: any, office_data: IOffice) => {
                if (err || office_data === null) {
                    mongoError(err, res);
                }
                else {
                    successResponse('get office successfull from office id', office_data, res);
                }
            });
    }
    public update_office(req: Request, res: Response) {
        if (req.params.id && req.body.country && req.body.city) {
            const office_filter = { _id: req.params.id };
            this.office_service.filterOffice(office_filter, (err: any, office_data: IOffice) => {
                if (err) {
                    mongoError(err, res);
                } else if (office_data) {
                    office_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: `${req.body.u_name} ${req.body.u_surname}`,
                        modification_note: 'Office data updated'
                    });
                    const office_params: IOffice = {
                        _id: req.params.id,
                        country: req.body.country ? req.body.country : office_data.country,
                        city: req.body.city ? req.body.city : office_data.city,
                        street: req.body.street ? req.body.street : office_data.street,
                        zipCode: req.body.zipCode ? req.body.zipCode : office_data.zipCode,
                        modification_notes: office_data.modification_notes
                    };
                    this.office_service.updateOffice(office_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update office successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid office', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_office(req: Request, res: Response) {
        if (req.params.id) {
            this.office_service.deleteOffice(req.params.id, (err: any, delete_details: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete office successfull', null, res);
                } else {
                    failureResponse('invalid office', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}