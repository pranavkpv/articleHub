import { ICategoryModelEntity } from "../../db/interface/category";

export interface ICategoryRepository {
   findAllCategory():Promise<ICategoryModelEntity[]>
}