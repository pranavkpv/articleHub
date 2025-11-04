import { adminEventDto, userEventDto } from "../../../application/dtos/event";
import { IEventModelEntity, participantData } from "../../../infrastructure/db/interface/event";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IEventMapper } from "../interface/IEventmapper";

export class EventMapper implements IEventMapper {
   constructor(
      private _volunteerReposity: IVolunteerRepository,
      private _userRepository: IUserRepository
   ) { }
   async toAdminEventDto(data: IEventModelEntity[]): Promise<adminEventDto[]> {
      let result: adminEventDto[] = []
      for (let element of data) {
         let volunteers: string[] = []
         let participants: participantData[] = []
         for (let item of element.volunteers) {
            const volunteer = await this._volunteerReposity.findVolunteerById(item)
            if (!volunteer) {
               volunteers.push("")
            } else {
               volunteers.push(volunteer.username)
            }
         }
         for (let item of element.participants) {
            const user = await this._userRepository.findUserById(item.id)
            if (!user) {
               participants.push({ id: "", status: false })
            } else {
               participants.push({ id: user.username, status: item.status })
            }
         }
         result.push({
            description: element.description, end_date: element.end_date, event_name: element.event_name,
            guests: element.guests, hosted_by: element.hosted_by, image: element.image, judges: element.judges, location: element.location,
            max_tickets: element.max_tickets, meal_count: element.meal_count, participants: participants, rewards: element.rewards, start_date: element.start_date,
            volunteers: volunteers,_id:element._id
         })
      }
      return result
   }
   toUserEventDto(data: IEventModelEntity[]): userEventDto[] {
      return data.map((element) => ({
         _id: element._id,
         event_name: element.event_name,
         start_date: element.start_date,
         end_date: element.end_date,
         location: element.location,
         description: element.description,
         rewards: element.rewards,
         image: element.image,
         hosted_by: element.hosted_by,
         guests: element.guests,
         meal_count: element.meal_count,
         max_tickets: element.max_tickets,
      }))
   }
}