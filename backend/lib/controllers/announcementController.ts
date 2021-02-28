import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';
import { IAnnouncement } from '../models/announcements/model';
import AnnouncementService from '../models/announcements/service';
import e = require('express');
import {AnnouncementStatus} from "../models/announcements/enums";

export class AnnouncementController {

    private announcement_service: AnnouncementService = new AnnouncementService();

    public create_announcement(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.date) {
            const announcement_params: IAnnouncement = {
                description: req.body.description,
                country: req.body.country,
                city: req.body.city,
                street: req.body.street,
                zipCode: req.body.zipCode,
                imagens: req.body.imagens,
                status: req.body.status,
                reservation: null,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: "null",
                    modification_note: 'New announcement created'
                }]
            };
            this.announcement_service.createAnnouncement(announcement_params,
                (err: any, announcement_data: IAnnouncement) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create announcement successfully', announcement_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_announcement(req: Request, res: Response) {
        if (req.params.id) {
            const announcement_filter = { _id: req.params.id };
            this.announcement_service.filterAnnouncement(announcement_filter,
                (err: any, announcement_data: IAnnouncement) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get announcement successfully', announcement_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public update_announcement(req: Request, res: Response) {
        if (req.params.id && req.body.date) {
            const announcement_filter = { _id: req.params.id };
            this.announcement_service.filterAnnouncement(announcement_filter,
                (err: any, announcement_data: IAnnouncement) => {
                if (err) {
                    mongoError(err, res);
                } else if (announcement_data) {
                    announcement_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: "null",
                        modification_note: 'Announcement data updated'
                    });
                    const announcement_params: IAnnouncement = {
                        _id: req.params.id,
                        description: req.body.description,
                        country: req.body.country,
                        city: req.body.city,
                        street: req.body.street,
                        zipCode: req.body.zipCode,
                        imagens: req.body.imagens,
                        status: req.body.status,
                        reservation: req.body.reservation,
                        modification_notes: announcement_data.modification_notes
                    };
                    this.announcement_service.updateAnnouncement(announcement_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update announcement successfully', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid announcement', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_announcement(req: Request, res: Response) {
        if (req.params.id) {
            this.announcement_service.deleteAnnouncement(req.params.id, (err: any, delete_details: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete announcement successfully', null, res);
                } else {
                    failureResponse('invalid reservation', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}