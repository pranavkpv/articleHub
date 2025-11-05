
import { addArticle, articleAggregateByUser, editArticle, likeAggregateUser, likeData } from "../../../domain/entities/article";
import { IArticleModelEntity } from "../../db/interface/article";


export interface IArticleRepository {
   saveArticle(data:addArticle):Promise<void>
   likeArticle(data:likeData):Promise<void>
   disLikeArticle(data:likeData):Promise<void>
   blockArticle(data:likeData):Promise<void>
   editArticle(data:editArticle):Promise<void>
   deleteArticle(id:string):Promise<void>
   findArticleByUserId(id:string):Promise<IArticleModelEntity[]>
   findLikeByArticle(id:string):Promise<likeAggregateUser[]>
   findDisLikeByArticle(id:string):Promise<likeAggregateUser[]>
   findBlockByArticle(id:string):Promise<likeAggregateUser[]>
   findaggregateArticleByCategory(category:string[]):Promise<articleAggregateByUser[]>
}