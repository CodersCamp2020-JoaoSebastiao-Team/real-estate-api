import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';
import { IListing } from '../models/listings/model';
import ListingService from '../models/listings/service';
import e = require('express');
import {ListingStatus} from "../models/listings/enums";

export class ListingController {

    private listing_service: ListingService = new ListingService();

    public get_listings(req: Request, res: Response) {
        if (req.params.id) {
            const listing_filter = { _id: req.params.id };
            this.listing_service.filterListings(listing_filter,
                (err: any, listing_data: IListing) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get all listings successfully', listing_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public create_listing(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.date) {
            const listing_params: IListing = {
                description: req.body.description,
                country: req.body.country,
                city: req.body.city,
                street: req.body.street,
                zipCode: req.body.zipCode,
                images: req.body.images,
                status: req.body.status,
                reservation: null,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: "null",
                    modification_note: 'New listing created'
                }]
            };
            this.listing_service.createListing(listing_params,
                (err: any, listing_data: IListing) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create listing successfully', listing_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_listing(req: Request, res: Response) {
        if (req.params.id) {
            const listing_filter = { _id: req.params.id };
            this.listing_service.filterListings(listing_filter,
                (err: any, listing_data: IListing) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get listing successfully', listing_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public update_listing(req: Request, res: Response) {
        if (req.params.id && req.body.date) {
            const listing_filter = { _id: req.params.id };
            this.listing_service.filterListings(listing_filter,
                (err: any, listing_data: IListing) => {
                if (err) {
                    mongoError(err, res);
                } else if (listing_data) {
                    listing_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: "null",
                        modification_note: 'Listing data updated'
                    });
                    const listing_params: IListing = {
                        _id: req.params.id,
                        description: req.body.description,
                        country: req.body.country,
                        city: req.body.city,
                        street: req.body.street,
                        zipCode: req.body.zipCode,
                        images: req.body.imagens,
                        status: req.body.status,
                        reservation: req.body.reservation,
                        modification_notes: listing_data.modification_notes
                    };
                    this.listing_service.updateListing(listing_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update listing successfully', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid listing', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_listing(req: Request, res: Response) {
        if (req.params.id) {
            this.listing_service.deleteListing(req.params.id, (err: any, delete_details: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('listing deleted successfully', null, res);
                } else {
                    failureResponse('invalid reservation', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}