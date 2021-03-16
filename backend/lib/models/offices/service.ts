import { IOffice } from './model';
import offices from './schema';

export default class OfficeService {

    public createOffice(office_params: IOffice, callback: any) {
        const _session = new offices(office_params);
        _session.save(callback);
    }

    public filterOffice(query: any, callback: any) {
        offices.findOne(query, callback);
    }
    public findAllOffices(query: any, callback: any) {
        offices.count({}, function(error, numOfDocs) {
        });
        offices.find(query, callback);
    }

    public async findOffice(query: any, callback: any) {
        var userOffices: number = 0;
        offices.count(query, function(error, numOfDocs) {
            userOffices = numOfDocs;
        }).then(() =>{
        offices.find(query, callback);
        return userOffices;
        });
    }

    public updateOffice(office_params: IOffice, callback: any) {
        const query = { _id: office_params._id };
        offices.findOneAndUpdate(query, office_params, callback);
    }

    public deleteOffice(_id: String, callback: any) {
        const query = { _id: _id };
        offices.deleteOne(query, callback);
    }
}