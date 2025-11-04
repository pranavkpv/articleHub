import { IListCategoryUseCase } from "../../../application/usecases/interface/IListCategoryUseCase";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { ICategoryController } from "../interface/ICategory.controller";
import { Request, Response, NextFunction } from "express";


export class CategoryController implements ICategoryController {
   constructor(
      private _listCategoryUseCase: IListCategoryUseCase
   ) { }
   listAllCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         if (!req.headers) {
            res.status(HTTP_STATUS.CONFLICT).json({ success: false, message: "user not exist" })
            return
         }
         const category = await this._listCategoryUseCase.execute()
         if (!category) {
            res.status(HTTP_STATUS.CONFLICT).json({ success: false, message: "Error to fetch category" })
            return
         }
         res.status(HTTP_STATUS.OK).json({ success: true, message: category.message, data: category.data });
         return;
      } catch (error) {
         next(error)
      }
   }
}