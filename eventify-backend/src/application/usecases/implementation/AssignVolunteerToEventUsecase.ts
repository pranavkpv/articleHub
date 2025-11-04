import { commonOutput } from "../../../domain/entities/output";
import { assignVolunteerInput } from "../../../domain/entities/volunteer";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IAssignVolunteerToEventUsecase } from "../interface/IAssignVolunteerToEventUsecase";

export class AssignVolunteerToEventUsecase implements IAssignVolunteerToEventUsecase {
  constructor(
    private _eventRepository: IEventRepository,
    private _volunteerRepository: IVolunteerRepository
  ) { }
  async execute(input: assignVolunteerInput): Promise<commonOutput> {
    const eventData = await this._eventRepository.findEventById(input.event)
    if (!eventData) {
      return {
        message: event.not_exist,
        status: HTTP_STATUS.CONFLICT,
        success: false
      }
    }
    for (let element of input.data) {
      const volunteerData = await this._volunteerRepository.findVolunteerById(element)
      const existDuty = await this._eventRepository.findOtherEventByVolunteerId(element, input.event)
      for (let item of existDuty) {
        const eventStart = new Date(eventData.start_date);
        const eventEnd = new Date(eventData.end_date);
        const itemStart = new Date(item.start_date);
        const itemEnd = new Date(item.end_date);
        if (itemStart <= eventEnd && itemEnd >= eventStart) {
          return {
            message: `The volunteer ${ volunteerData?.username } already has duty in this time period`,
            status: HTTP_STATUS.CONFLICT,
            success: false
          };
        }
        if (itemStart <= eventStart && itemEnd >= eventEnd) {
          return {
            message: `The volunteer ${ volunteerData?.username } already has duty in this time period`,
            status: HTTP_STATUS.CONFLICT,
            success: false
          };
        }
      }
    }
    if (new Date(eventData.end_date) <= new Date()) {
      return {
        message: event.already_complete,
        status: HTTP_STATUS.CONFLICT,
        success: false
      };
    }
    await this._eventRepository.updateVolunteerInEvent(input)
    return {
      message: event.volunteer_add,
      status: HTTP_STATUS.OK,
      success: true
    }
  }
}