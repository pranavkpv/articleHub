import { getPreferenceBaseArticleData } from "../../../domain/entities/article";
import { IBlockModelEntity } from "../../../infrastructure/db/interface/block";
import { IArticleMapper } from "../../../infrastructure/mappers/interfaces/IArticleMapper";
import { IArticleRepository } from "../../../infrastructure/repositories/interface/IArticleRepository";
import { IUserRepository } from "../../../infrastructure/repositories/interface/IUserRepository";
import { IGetPreferenceBaseArticleUsecase } from "../interface/IGetPreferenceBaseArticleUsecase";

export class GetPreferenceBaseArticleUsecase implements IGetPreferenceBaseArticleUsecase {
   constructor(
      private _userRepository: IUserRepository,
      private _articleRepository: IArticleRepository,
      private _articlemapper: IArticleMapper
   ) { }
   async execute(id: string): Promise<getPreferenceBaseArticleData[]> {
      const user = await this._userRepository.findUserById(id)
      if (!user) {
         return []
      }
      const articleByCategory = await this._articleRepository.findaggregateArticleByCategory(user.preferences)
      const blockDataByUser = await this._articleRepository.findBlockByUser(id)
      const hiddenArticle = blockDataByUser.map((element: IBlockModelEntity) => element.articleId)
      const showedData = articleByCategory.filter((element) => !hiddenArticle.includes(String(element._id)))
      let data: getPreferenceBaseArticleData[] = []
      for (let element of showedData) {
         const likeData = await this._articleRepository.findLikeByArticle(String(element._id))
         const disLikeData = await this._articleRepository.findDisLikeByArticle(String(element._id))
         const blockData = await this._articleRepository.findBlockByArticle(String(element._id))
         const mappedBlock = this._articlemapper.toUsernamefromAction(blockData)
         const mappedLike = this._articlemapper.toUsernamefromAction(likeData)
         const mappedDislike = this._articlemapper.toUsernamefromAction(disLikeData)

         data.push({
            _id: element._id, category: element.category, description: element.description, image: element.image,
            tags: element.tags, title: element.title, block: mappedBlock, dislike: mappedDislike, like: mappedLike,
            username: element.userDetails.firstname + element.userDetails.lastname
         })
        
      }
      
      return data
   }
}