
import { addArticle, articleAggregateByUser, editArticle, likeAggregateUser, likeData } from "../../../domain/entities/article";
import { IArticleModelEntity } from "../../db/interface/article";
import { IBlockModelEntity } from "../../db/interface/block";
import { IDislikeModelEntity } from "../../db/interface/dislike";
import { ILikeModelEntity } from "../../db/interface/like";


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
   findLikeByArticlAndUser(data:likeData):Promise<ILikeModelEntity | null>
   removeLike(data:likeData):Promise<void>
   findDisLikeByArticleAndUser(data:likeData):Promise<IDislikeModelEntity | null>
   removeDisLike(data:likeData):Promise<void>
   findBlockByUser(id:string):Promise<IBlockModelEntity[]>
}