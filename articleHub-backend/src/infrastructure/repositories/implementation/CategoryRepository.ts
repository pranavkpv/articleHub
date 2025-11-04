import { ICategoryModelEntity } from "../../db/interface/category";
import { categoryDB } from "../../db/model/category";
import { ICategoryRepository } from "../interface/IcategoryRepository";

export class CategoryRepository implements ICategoryRepository {
   async findAllCategory(): Promise<ICategoryModelEntity[]> {
       return await categoryDB.find()
   }
}