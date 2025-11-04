import { commonOutput } from "../../../domain/entities/output";
import { Email } from "../../../domain/shared/messages/email";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IBookEventUseCase } from "../interface/IBookEventUseCase";

export class BookEventUseCase implements IBookEventUseCase {
  constructor(
    private _eventRepository: IEventRepository,
    private _userRepository: IUserRepository
  ) {}

  async execute(eventData: string, user: string): Promise<commonOutput> {
    // User exists
    const existUser = await this._userRepository.findUserById(user);
    if (!existUser) {
      return { success: false, message: Email.notExist, status: HTTP_STATUS.CONFLICT };
    }

    // Event exists
    const existEvent = await this._eventRepository.findEventById(eventData);
    if (!existEvent) {
      return { success: false, message: event.notExist, status: HTTP_STATUS.CONFLICT };
    }

    // Event date not passed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventStart = new Date(existEvent.start_date);
    eventStart.setHours(0, 0, 0, 0);
    if (eventStart < today) {
      return { success: false, message: event.expire, status: HTTP_STATUS.CONFLICT };
    }

    // Max participants
    if (existEvent.participants.length >= existEvent.max_tickets) {
      return { success: false, message: event.max_limit_exceed , status: HTTP_STATUS.CONFLICT };
    }

    // Already booked
    for (let element of existEvent.participants) {
      if (element.id === user) {
        return { success: false, message: Email.already, status: HTTP_STATUS.CONFLICT };
      }
    }

    // Book event
    const book = await this._eventRepository.addUserInEvent(eventData, user);
    if (!book) {
      return { success: false, message: event.bookfail, status: HTTP_STATUS.CONFLICT };
    }

    return { success: true, message: event.bookSuccess + "Remaining Tiket as "+ (existEvent.participants.length-1), status: HTTP_STATUS.OK };
  }
}
