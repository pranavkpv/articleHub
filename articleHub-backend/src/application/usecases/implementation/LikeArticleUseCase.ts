import { likeData } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IArticleRepository } from "../../../infrastructure/repositories/interface/IArticleRepository";
import { ILikeArticleUseCase } from "../interface/ILikeArticleUseCase";

export class LikeArticleUseCase implements ILikeArticleUseCase {
   constructor(
      private _articleRepository: IArticleRepository
   ) { }
   async execute(data: likeData): Promise<commonOutput> {
      await this._articleRepository.likeArticle(data)
      return {
         message:"like success",
         status:HTTP_STATUS.OK,
         success:true
      }
   }
}