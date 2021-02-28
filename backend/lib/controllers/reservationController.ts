import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';
import { IReservation } from '../models/reservations/model';
import ReservationService from '../models/reservations/service';
import e = require('express');

export class ReservationController {

    private reservation_service: ReservationService = new ReservationService();

    public create_reservation(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.date) {
            const reservation_params: IReservation = {
                date: req.body.date,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: "null",
                    modification_note: 'New reservation created'
                }]
            };
            this.reservation_service.createReservation(reservation_params, (err: any, reservation_data: IReservation) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create reservation successfull', reservation_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_reservation(req: Request, res: Response) {
        if (req.params.id) {
            const reservation_filter = { _id: req.params.id };
            this.reservation_service.filterReservation(reservation_filter, (err: any, reservation_data: IReservation) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get reservation successfull', reservation_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public update_reservation(req: Request, res: Response) {
        if (req.params.id && req.body.date) {
            const reservation_filter = { _id: req.params.id };
            this.reservation_service.filterReservation(reservation_filter, (err: any, reservation_data: IReservation) => {
                if (err) {
                    mongoError(err, res);
                } else if (reservation_data) {
                    reservation_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: "null",
                        modification_note: 'Reservation data updated'
                    });
                    const reservation_params: IReservation = {
                        _id: req.params.id,
                        date: req.body.date ? req.body.date : reservation_data.date,
                        modification_notes: reservation_data.modification_notes
                    };
                    this.reservation_service.updateReservation(reservation_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update reservation successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid reservation', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_reservation(req: Request, res: Response) {
        if (req.params.id) {
            this.reservation_service.deleteReservation(req.params.id, (err: any, delete_details: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete reservation successfull', null, res);
                } else {
                    failureResponse('invalid reservation', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}