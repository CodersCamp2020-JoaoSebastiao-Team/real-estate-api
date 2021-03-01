import { IReservation } from './model';
import reservations from './schema';

export default class ReservationService {

    public createReservation(reservation_params: IReservation, callback: any) {
        const _session = new reservations(reservation_params);
        _session.save(callback);
    }

    public filterReservation(query: any, callback: any) {
        reservations.findOne(query, callback);
    }
    public findAllReservations(query: any, callback: any) {
        reservations.count({}, function(error, numOfDocs) {
            console.log('I have '+numOfDocs+' documents in my collection');
        });
        reservations.find(query, callback);
    }

    public async findReservation(query: any, callback: any) {
        let userReservations;
        reservations.count(query, function(error, numOfDocs) {
            userReservations = numOfDocs;
        });
        console.log("reservations length: ", userReservations)
        reservations.find(query, callback);
        return userReservations
    }

    public updateReservation(reservation_params: IReservation, callback: any) {
        const query = { _id: reservation_params._id };
        reservations.findOneAndUpdate(query, reservation_params, callback);
    }

    public deleteReservation(_id: String, callback: any) {
        const query = { _id: _id };
        reservations.deleteOne(query, callback);
    }
}