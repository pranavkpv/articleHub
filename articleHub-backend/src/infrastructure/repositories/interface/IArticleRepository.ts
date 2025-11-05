import { addArticle, editArticle, likeData } from "../../../domain/entities/article";

export interface IArticleRepository {
   saveArticle(data:addArticle):Promise<void>
   likeArticle(data:likeData):Promise<void>
   disLikeArticle(data:likeData):Promise<void>
   blockArticle(data:likeData):Promise<void>
   editArticle(data:editArticle):Promise<void>
}