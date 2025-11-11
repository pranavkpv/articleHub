import { likeData } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IArticleRepository } from "../../../infrastructure/repositories/interface/IArticleRepository";
import { IBlockArticleUseCase } from "../interface/IBlockArticleUseCase";

export class BlockArticleUseCase implements IBlockArticleUseCase {
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
      }
      await this._articleRepository.blockArticle(data)
      return {
         message: 'block success',
         status: HTTP_STATUS.OK,
         success: true
      }
   }
}