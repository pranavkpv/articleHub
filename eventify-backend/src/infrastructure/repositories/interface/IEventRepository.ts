import { addEventData, attendanceData } from "../../../domain/entities/event";
import { assignVolunteerInput } from "../../../domain/entities/volunteer";
import { IEventModelEntity } from "../../db/interface/event";

export interface IEventRepository {
   saveEvent(data: addEventData): Promise<boolean>
   findAllEvents(): Promise<IEventModelEntity[]>
   addUserInEvent(event: string, user: string): Promise<boolean>
   updateParticipantStatus(data: attendanceData): Promise<boolean>
   findEventById(id: string): Promise<IEventModelEntity | null>
   findEventByVolunteerId(id: string): Promise<IEventModelEntity[]>
   updateVolunteerInEvent(input:assignVolunteerInput):Promise<void>
   findEventBynameHostLocStart(input:addEventData):Promise<IEventModelEntity | null>
   UpdateDeleteStatus(event:string):Promise<boolean>
   updateEventById(data:IEventModelEntity):Promise<void>
   findEditEventExist(data:IEventModelEntity):Promise<IEventModelEntity | null>
   findOtherEventByVolunteerId(volunteerId: string,eventId:string): Promise<IEventModelEntity[]>
   findEventByParticipant(id:string):Promise<IEventModelEntity[]>
}