import { IAnnouncement } from './model';
import announcements from './schema';
//import reservations from '../reservations/schema'

export default class AnnouncementService {

    public createAnnouncement(announcements_params: IAnnouncement, callback: any) {
        const _session = new announcements(announcements_params);
        _session.save(callback);
    }

    public filterAnnouncement(query: any, callback: any) {
        announcements.findOne(query, callback);
    }

    public updateAnnouncement(announcements_params: IAnnouncement, callback: any) {
        const query = { _id: announcements_params._id };
        announcements.findOneAndUpdate(query, announcements_params, callback);
    }

    public deleteAnnouncement(_id: String, callback: any) {
        const query = { _id: _id };
        announcements.deleteOne(query, callback);
    }
}