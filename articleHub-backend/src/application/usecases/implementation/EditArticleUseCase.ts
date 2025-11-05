import { editArticle } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IArticleRepository } from "../../../infrastructure/repositories/interface/IArticleRepository";
import { IEditArticleUseCase } from "../interface/IEditArticleUseCase";

export class EditArtcleUseCase implements IEditArticleUseCase {
   constructor(
      private _articleREpository: IArticleRepository
   ) { }
   async execute(data: editArticle): Promise<commonOutput> {
      await this._articleREpository.editArticle(data)
      return {
         message: "edit success",
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}