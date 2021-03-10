import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';
import { IOffice } from '../models/office/model';
import OfficeService from '../models/office/service';
import offices from '../models/office/schema';

export class OfficeController {

    private office_service: OfficeService = new OfficeService();

    public async create_office(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.user) {
            const office_params: IOffice = {
                user: req.body.user,
                announcement: req.body.announcement,
                u_note: req.body.u_note,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: `${req.body.user.name} ${req.body.user.surname}`,
                    modification_note: req.body.u_note
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
    public async get_user_office(req: Request, res: Response) {
        let office_filter: any = {"user._id": req.params.id} ;
        if (req.params.id) {
            return this.office_service.findOffice(office_filter, (err: any, office_data: IOffice) => {
                if (err || office_data === null) {
                    mongoError(err, res);
                }
                else {
                    successResponse('get office successfull from office user id', office_data , res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public async user_office(req: Request, res: Response) {
        let office_filter: any = {"user._id": `${req.body.user._id}`} ;
        let userOffices: number = -1;
        await offices.count(office_filter, function(error, numOfDocs) {
            userOffices = numOfDocs;
        }).then(element => {});
        return userOffices;
    }
    public update_office(req: Request, res: Response) {
        if (req.params.id && req.body.user && req.body.announcement) {
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
                        user: req.body.user ? req.body.user : office_data.user,
                        announcement: req.body.announcement ? req.body.announcement : office_data.announcement,
                        u_note: req.body.u_note ? req.body.u_note : office_data.u_note,
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