import { commonOutput } from "../../../domain/entities/output";
import { attendance } from "../../../domain/shared/messages/attendance";
import { Email } from "../../../domain/shared/messages/email";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { ITakeAttendanceUseCase } from "../interface/ITakeAttendanceUseCase";

export class TakeAttendanceUseCase implements ITakeAttendanceUseCase {
   constructor(
      private _eventRepository: IEventRepository,
      private _userRepository: IUserRepository
   ) { }
   async execute(data: string): Promise<commonOutput> {
      const arrayOfData = data.split('-')
      const eventId = arrayOfData[0]
      const userId = arrayOfData[1]
      const status = true
      if (!eventId) {
         return {
            success: true,
            message: attendance.failed,
            status: HTTP_STATUS.CONFLICT
         }
      }
      if (!userId) {
         return {
            success: true,
            message: attendance.failed,
            status: HTTP_STATUS.CONFLICT
         }
      }
      const existUser = await this._userRepository.findUserById(userId)
      if (!existUser) {
         return {
            success: false,
            message: Email.notExist,
            status: HTTP_STATUS.CONFLICT
         }
      }
      const existEvent = await this._eventRepository.findEventById(eventId)
      //event exist
      if (!existEvent) {
         return {
            success: false,
            message: event.notExist,
            status: HTTP_STATUS.CONFLICT
         }
      }
      //check event expire
      const today = new Date()
      if (existEvent.end_date < today) {
         return {
            success: false,
            message: event.expire,
            status: HTTP_STATUS.CONFLICT
         }
      }
      //check user exist or not
      let userExist = false
      let scanned = false
      for (let element of existEvent.participants) {
         if (element.id == userId) {
            userExist = true
            if (element.status == true) {
               scanned = true
            }
         }
      }
      if (!userExist) {
         return {
            success: false,
            message: event.not_exist,
            status: HTTP_STATUS.CONFLICT
         }
      }
      //already take attendance
      if (scanned) {
         return {
            success: false,
            message: event.already_take,
            status: HTTP_STATUS.CONFLICT
         }
      }
      await this._eventRepository.updateParticipantStatus({ event: eventId, user: userId, status })
      return {
         success: true,
         message: attendance.success,
         status: HTTP_STATUS.OK
      }
   }
}