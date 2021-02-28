import { ModificationNote } from "../common/model";
import {AnnouncementStatus} from './enums'
import {IReservation} from '../reservations/model'
export interface IAnnouncement {
    _id?: String;
    description: number;
    country: String;
    city: String;
    street: String;
    zipCode: String;
    imagens: String[];
    status: AnnouncementStatus;
    reservation: IReservation|null;
    modification_notes: ModificationNote[]
}