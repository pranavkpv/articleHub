import { commonOutput } from "../../../domain/entities/output";
import { attendance } from "../../../domain/shared/messages/attendance";
import { Email } from "../../../domain/shared/messages/email";
import { event } from "../../../domain/shared/messages/event";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IEventRepository } from "../../../infrastructure/repositories/interface/IEventRepository";
import { IFoodRepository } from "../../../infrastructure/repositories/interface/IFoodRepository";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IMarkFoodAteUseCase } from "../interface/IMarkFoodAteUseCase";

export class MarkFoodAteUseCase implements IMarkFoodAteUseCase {
  constructor(
    private _foodRepository: IFoodRepository,
    private _userRepository: IUserRepository,
    private _eventRepository: IEventRepository
  ) {}

  async execute(data: string): Promise<commonOutput> {
    const [eventId, userId] = data.split('-');

    if (!eventId || !userId) {
      return { success: false, message: attendance.failed, status: HTTP_STATUS.CONFLICT };
    }

    const existUser = await this._userRepository.findUserById(userId);
    if (!existUser) {
      return { success: false, message: Email.notExist, status: HTTP_STATUS.CONFLICT };
    }

    const existEvent = await this._eventRepository.findEventById(eventId);
    if (!existEvent) {
      return { success: false, message: event.notExist, status: HTTP_STATUS.CONFLICT };
    }

    // Event not expired
    if (new Date(existEvent.end_date) < new Date()) {
      return { success: false, message: event.expire, status: HTTP_STATUS.CONFLICT };
    }

    let userExist = false;
    let scanned = false;
    for (let element of existEvent.participants) {
      if (element.id === userId) {
        userExist = true;
        if (element.status === true) scanned = true;
      }
    }

    if (!userExist) {
      return { success: false, message: event.not_exist, status: HTTP_STATUS.CONFLICT };
    }

    if (!scanned) {
      return { success: false, message: event.no_attendance, status: HTTP_STATUS.CONFLICT };
    }

    const foodByuserAndEvent = await this._foodRepository.findFoodByUserandEvent({ userId, eventId });
    if ((foodByuserAndEvent?.count || 0) >= existEvent.meal_count) {
      return { success: false, message: event.food_limit_exceed, status: HTTP_STATUS.CONFLICT };
    }

    if (foodByuserAndEvent) {
      await this._foodRepository.updateCountofFood(foodByuserAndEvent._id);
    } else {
      await this._foodRepository.saveCountofFood({ userId, eventId });
    }

    return { success: true, message: event.allowedFood, status: HTTP_STATUS.OK };
  }
}
