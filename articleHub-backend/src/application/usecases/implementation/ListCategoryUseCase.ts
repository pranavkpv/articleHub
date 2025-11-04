import { listCategoryOutput } from "../../../domain/entities/category";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { ICategoryRepository } from "../../../infrastructure/repositories/interface/IcategoryRepository";
import { IListCategoryUseCase } from "../interface/IListCategoryUseCase";

export class ListCategoryUseCase implements IListCategoryUseCase {
   constructor(
      private _categoryRepository: ICategoryRepository
   ) { }
   async execute(): Promise<listCategoryOutput> {
      const data = await this._categoryRepository.findAllCategory()
      return{
         success:true,
         message:"category fetch success",
         status:HTTP_STATUS.OK,
         data
      }
   }
}