import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';
import { IReservation, IUser, IAnnouncement } from '../models/reservations/model';
import ReservationService from '../models/reservations/service';
import reservations from '../models/reservations/schema';
import e = require('express');

export class ReservationController {

    private reservation_service: ReservationService = new ReservationService();

    public async create_reservation(req: Request, res: Response) {
        console.log("user id: ",req.body.user._id);
         const userReservations = this.user_reservation(req, res);
         console.log("user reservations ",userReservations);
        // this check whether all the filds were send through the erquest or not
        if (req.body.user) {
            const reservation_params: IReservation = {
                user: req.body.user,
                announcement: req.body.announcement,
                u_note: req.body.u_note,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: `${req.body.user.name} ${req.body.user.surname}`,
                    modification_note: req.body.u_note
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
            let reservation_filter: any = { _id: req.params.id, };
            this.reservation_service.filterReservation(reservation_filter, (err: any, reservation_data: IReservation) => {
                if (err || reservation_data === null) {
                    mongoError(err, res);
                }
                else {
                    successResponse('get reservation successfull from reservation id', reservation_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public get_all_reservation(req: Request, res: Response) {
            let reservation_filter: any = { __v: 0, };
            this.reservation_service.findAllReservations(reservation_filter, (err: any, reservation_data: IReservation) => {
                if (err || reservation_data === null) {
                    mongoError(err, res);
                }
                else {
                    successResponse('get reservation successfull from reservation id', reservation_data, res);
                }
            });
    }
    public async get_user_reservation(req: Request, res: Response) {
        let reservation_filter: any = {"user._id": req.params.id} ;
        if (req.params.id) {
            return this.reservation_service.findReservation(reservation_filter, (err: any, reservation_data: IReservation) => {
                if (err || reservation_data === null) {
                    mongoError(err, res);
                }
                else {
                    successResponse('get reservation successfull from reservation id', reservation_data , res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public async user_reservation(req: Request, res: Response) {
        let reservation_filter: any = {"user._id": `${req.body._id}`} ;
        let userReservations: number = 0;
        await reservations.count(reservation_filter, function(error, numOfDocs) {
            userReservations = numOfDocs;
        }).then(element => console.log("reservations length: ", userReservations));
        
        return userReservations;
    }
    public update_reservation(req: Request, res: Response) {
        if (req.params.id && req.body.user && req.body.announcement) {
            const reservation_filter = { _id: req.params.id };
            this.reservation_service.filterReservation(reservation_filter, (err: any, reservation_data: IReservation) => {
                if (err) {
                    mongoError(err, res);
                } else if (reservation_data) {
                    reservation_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: `${req.body.u_name} ${req.body.u_surname}`,
                        modification_note: 'Reservation data updated'
                    });
                    const reservation_params: IReservation = {
                        _id: req.params.id,
                        user: req.body.user ? req.body.user : reservation_data.user,
                        announcement: req.body.announcement ? req.body.announcement : reservation_data.announcement,
                        u_note: req.body.u_note ? req.body.u_note : reservation_data.u_note,
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