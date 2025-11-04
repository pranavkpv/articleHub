import { foodAdd } from "../../../domain/entities/user";
import { IFoodModelEntity } from "../../db/interface/food";

export interface IFoodRepository {
   findFoodByUserandEvent(data: foodAdd): Promise<IFoodModelEntity | null>
   updateCountofFood(id:string):Promise<void>
   saveCountofFood(data: foodAdd):Promise<void>
}