import { addArticle } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IArticleRepository } from "../../../infrastructure/repositories/interface/IArticleRepository";
import { IArticleSaveUseCase } from "../interface/IArticleSaveUseCase";

export class ArticleSaveUsecase implements IArticleSaveUseCase {
   constructor(
      private _articleRepository: IArticleRepository
   ) { }
   async execute(data: addArticle): Promise<commonOutput> {
      await this._articleRepository.saveArticle(data)
      return{
         success:true,
         message:'article saved successfully',
         status:HTTP_STATUS.OK
      }
   }
}