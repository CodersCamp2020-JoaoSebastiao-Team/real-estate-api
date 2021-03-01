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

    public updateReservation(reservation_params: IReservation, callback: any) {
        const query = { _id: reservation_params._id };
        reservations.findOneAndUpdate(query, reservation_params, callback);
    }
    
    public deleteReservation(_id: String, callback: any) {
        const query = { _id: _id };
        reservations.deleteOne(query, callback);
    }
}