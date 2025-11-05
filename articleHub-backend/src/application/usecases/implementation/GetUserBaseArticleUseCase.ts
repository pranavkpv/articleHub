import { getUserBaseArticleData } from "../../../domain/entities/article";
import { IArticleMapper } from "../../../infrastructure/mappers/interfaces/IArticleMapper";
import { IArticleRepository } from "../../../infrastructure/repositories/interface/IArticleRepository";
import { IGetUserBaseArticleUseCase } from "../interface/IGetUserBaseArticleUseCase";

export class GetUserBaseArticleUseCase implements IGetUserBaseArticleUseCase {
   constructor(
      private _articleRepository: IArticleRepository,
      private _articlemapper: IArticleMapper
   ) { }
   async execute(id: string): Promise<getUserBaseArticleData[]> {
      const articles = await this._articleRepository.findArticleByUserId(id)
      let data: getUserBaseArticleData[] = []
      for (let element of articles) {
         const likeData = await this._articleRepository.findLikeByArticle(element._id)
         const disLikeData = await this._articleRepository.findDisLikeByArticle(element._id)
         const blockData = await this._articleRepository.findBlockByArticle(element._id)
         const mappedBlock = this._articlemapper.toUsernamefromAction(blockData)
         const mappedLike = this._articlemapper.toUsernamefromAction(likeData)
         const mappedDislike = this._articlemapper.toUsernamefromAction(disLikeData)
         data.push({
            _id: element._id, category: element.category, description: element.description, image: element.image,
            tags: element.tags, title: element.title, block: mappedBlock, dislike: mappedDislike, like: mappedLike
         })
      }
      return data
   }
}