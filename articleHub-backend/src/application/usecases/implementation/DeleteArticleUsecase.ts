import { commonOutput } from "../../../domain/entities/common";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IArticleRepository } from "../../../infrastructure/repositories/interface/IArticleRepository";
import { IDeleteArticleUseCase } from "../interface/IDeleteArticleUseCase";

export class DeleteArticleUsecase implements IDeleteArticleUseCase {
   constructor(
      private _articleRepository: IArticleRepository
   ) { }
   async execute(id: string): Promise<commonOutput> {
      await this._articleRepository.deleteArticle(id)
      return {
         message: 'delete success',
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}