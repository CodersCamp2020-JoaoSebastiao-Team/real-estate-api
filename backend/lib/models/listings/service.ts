import { IListing } from './model';
import listings from './schema';
import reservations from "../reservations/schema";
import {EstateTypes, ListingStatus} from "./enums";
import {IReservation} from "../reservations/model";


export default class ListingService {

    public createListing(listings_params: IListing, callback: any) {
        const _session = new listings(listings_params);
        _session.save(callback);
    }

    public filterListings(query: any, callback: any) {
        listings.findOne(query, callback);
    }
    public findAllListings(query: any, callback: any) {
        listings.count({}, function(error, numOfDocs) {
            console.log('I have '+numOfDocs+' documents in my collection');
        });
        listings.find(query, callback);
    }
    public updateListing(listings_params: IListing, callback: any) {
        const query = { _id: listings_params._id };
        listings.findOneAndUpdate(query, listings_params, callback);
    }

    public deleteListing(_id: String, callback: any) {
        const query = { _id: _id };
        listings.deleteOne(query, callback);
    }
}