import mongoose from "mongoose";
import { addEventData, attendanceData } from "../../../domain/entities/event";
import { IEventModelEntity } from "../../db/interface/event";
import { eventDB } from "../../db/model/event";
import { IEventRepository } from "../interface/IEventRepository";
import { assignVolunteerInput } from "../../../domain/entities/volunteer";

export class EventRepository implements IEventRepository {
   async saveEvent(data: addEventData): Promise<boolean> {
      const newEvent = new eventDB(data)
      await newEvent.save()
      return true
   }
   async findAllEvents(): Promise<IEventModelEntity[]> {
      return await eventDB.find({ delete_status: false })
   }
   async addUserInEvent(event: string, user: string): Promise<boolean> {
      const userId = new mongoose.Types.ObjectId(user);
      await eventDB.findByIdAndUpdate(event, { $push: { participants: { id: userId, status: false } } })
      return true
   }
   async updateParticipantStatus(data: attendanceData): Promise<boolean> {
      const { event, user, status } = data
      await eventDB.findOneAndUpdate({ _id: event, "participants.id": user }, { "participants.$.status": status })
      return true
   }
   async findEventById(id: string): Promise<IEventModelEntity | null> {
      return await eventDB.findById(id)
   }
   async findEventByVolunteerId(id: string): Promise<IEventModelEntity[]> {
      return await eventDB.find({ volunteers: { $in: id }, delete_status: false })
   }
   async updateVolunteerInEvent(input: assignVolunteerInput): Promise<void> {
      await eventDB.findByIdAndUpdate(input.event, { volunteers: input.data })
   }
   async findEventBynameHostLocStart(input: addEventData): Promise<IEventModelEntity | null> {
      return await eventDB.findOne({ event_name: { $regex: input.event_name, $options: "i" }, start_date: input.start_date, host: input.hosted_by })
   }
   async UpdateDeleteStatus(event: string): Promise<boolean> {
      await eventDB.findByIdAndUpdate(event, { delete_status: true })
      return true
   }
   async updateEventById(data: IEventModelEntity): Promise<void> {
      if (data.image == '') {
         await eventDB.findByIdAndUpdate(data._id, {
            event_name: data.event_name,
            start_date: data.start_date,
            end_date: data.end_date,
            location: data.location,
            description: data.description,
            rewards: data.rewards,
            hosted_by: data.hosted_by,
            guests: data.guests,
            volunteers: [],
            meal_count: data.meal_count,
            participants: [],
            judges: data.judges,
            max_tickets: data.max_tickets,
            delete_status: false
         })
      } else {
         await eventDB.findByIdAndUpdate(data._id, {
            event_name: data.event_name,
            start_date: data.start_date,
            end_date: data.end_date,
            location: data.location,
            description: data.description,
            rewards: data.rewards,
            image: data.image,
            hosted_by: data.hosted_by,
            guests: data.guests,
            volunteers: [],
            meal_count: data.meal_count,
            participants: [],
            judges: data.judges,
            max_tickets: data.max_tickets,
            delete_status: false
         })
      }
   }
   async findEditEventExist(data: IEventModelEntity): Promise<IEventModelEntity | null> {
      return await eventDB.findOne({ _id: { $ne: data._id }, event_name: { $regex: data.event_name, $options: "i" }, start_date: data.start_date, host: data.hosted_by })
   }
   async findOtherEventByVolunteerId(volunteerId: string, eventId: string): Promise<IEventModelEntity[]> {
      return await eventDB.find({ _id: { $ne: eventId }, volunteers: { $in: volunteerId }, delete_status: false })
   }
   async findEventByParticipant(id: string): Promise<IEventModelEntity[]> {
      return await eventDB.find({ participants: { $elemMatch: { id } },delete_status:false })
   }
}