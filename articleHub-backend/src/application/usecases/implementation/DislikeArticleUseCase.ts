import { likeData } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IArticleRepository } from "../../../infrastructure/repositories/interface/IArticleRepository";
import { IDislikeArticleUseCase } from "../interface/IDislikeArticleUseCase";

export class DislikeArticleUseCase implements IDislikeArticleUseCase {
   constructor(
      private _articleRepository: IArticleRepository
   ) { }
   async execute(data: likeData): Promise<commonOutput> {
      const likeData = await this._articleRepository.findLikeByArticlAndUser(data)
      const disLikeData = await this._articleRepository.findDisLikeByArticleAndUser(data)
      if (likeData) {
         await this._articleRepository.removeLike(data)
      }
      if (disLikeData) {
         await this._articleRepository.removeDisLike(data)
         return {
            message: "remove Dislike",
            status: HTTP_STATUS.OK,
            success: true
         }
      }
      await this._articleRepository.disLikeArticle(data)
      return {
         message: 'dislike success',
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}