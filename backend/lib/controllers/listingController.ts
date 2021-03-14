import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../models/common/service';
import { IListing } from '../models/listings/model';
import ListingService from '../models/listings/service';
import e = require('express');
import {ListingStatus} from "../models/listings/enums";
import {IReservation} from "../models/reservations/model";



export class ListingController {

    private listing_service: ListingService = new ListingService();

    public create_listing(req: Request, res: Response) {
        if (req.body) {
            // @ts-ignore
            let user_id = req.user
            const listing_params: IListing = {
                description: req.body.description,
                country: req.body.country,
                city: req.body.city,
                street: req.body.street,
                zipCode: req.body.zipCode,
                images: req.body.images,
                estateType: req.body.estateType,
                status: ListingStatus.available,
                listingStatusType: req.body.listingStatusType,
                user_id: user_id,
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
    private filters(req:Request, listing_filter: any){
        if (req.query.estateType) {
            listing_filter = listing_filter["estateType"] = req.query.estateType
        }
        if(req.query.listingStatusType){
            listing_filter = listing_filter["listingStatusType"] = req.query.listingStatusType
        }
        return listing_filter
    }
    public get_all_listings(req: Request, res: Response) {
        let listing_filter: any = { __v: 0};
        listing_filter = this.filters(req, listing_filter);

        this.listing_service.findAllListings(listing_filter, (err: any, listing_data: IListing) => {
            if (err || listing_data === null) {
                mongoError(err, res);
            }
            else {
                successResponse('get listings successfully', listing_data, res);
            }
        });
    }
    public get_all_available_listings(req: Request, res: Response) {
        let listing_filter: any = { __v: 0, status: 'available'};
        listing_filter = this.filters(req, listing_filter);
        this.listing_service.findAllListings(listing_filter, (err: any, listing_data: IListing) => {
            if (err || listing_data === null) {
                mongoError(err, res);
            }
            else {
                successResponse('get available listings successfully', listing_data, res);
            }
        });
    }
    public update_listing(req: Request, res: Response) {
        if (req.params.id && req.body) {
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
                    // @ts-ignore
                    let user_id = req.user
                    const listing_params: IListing = {
                        _id: req.params.id,
                        description: req.body.description,
                        country: req.body.country,
                        city: req.body.city,
                        street: req.body.street,
                        zipCode: req.body.zipCode,
                        images: req.body.imagens,
                        status: req.body.status,
                        listingStatusType: req.body.listingStatusType,
                        estateType: req.body.estateType,
                        reservation: req.body.reservation,
                        user_id: user_id,
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