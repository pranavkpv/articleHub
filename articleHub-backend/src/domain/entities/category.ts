import { ICategoryModelEntity } from "../../infrastructure/db/interface/category";
import { commonOutput } from "./common";


export interface listCategoryOutput extends commonOutput {
   data:ICategoryModelEntity[]
}