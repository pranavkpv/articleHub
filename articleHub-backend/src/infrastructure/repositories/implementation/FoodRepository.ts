import { foodAdd } from "../../../domain/entities/user";
import { IFoodModelEntity } from "../../db/interface/food";
import { foodDB } from "../../db/model/food";
import { IFoodRepository } from "../interface/IFoodRepository";

export class FoodRepository implements IFoodRepository {
   async findFoodByUserandEvent(data: foodAdd): Promise<IFoodModelEntity | null> {
      return await foodDB.findOne({ user_id: data.userId, event_id: data.eventId })
   }
   async saveCountofFood(data: foodAdd): Promise<void> {
      const newFood = new foodDB({
         user_id: data.userId,
         event_id: data.eventId,
         count: 1
      })
      await newFood.save()
   }
   async updateCountofFood(id: string): Promise<void> {
      await foodDB.findByIdAndUpdate(id, { $inc: { count: 1 } })
   }
}