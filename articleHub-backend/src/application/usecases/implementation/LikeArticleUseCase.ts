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
      const likeData = await this._articleRepository.findLikeByArticlAndUser(data)
      const disLikeData = await this._articleRepository.findDisLikeByArticleAndUser(data)
      if (likeData) {
         await this._articleRepository.removeLike(data)
         return {
            message: "remove like",
            status: HTTP_STATUS.OK,
            success: true
         }
      }
      if (disLikeData) {
         await this._articleRepository.removeDisLike(data)
      }
      await this._articleRepository.likeArticle(data)
      return {
         message: "like success",
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}