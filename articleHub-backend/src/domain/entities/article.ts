import { IArticleModelEntity } from "../../infrastructure/db/interface/article"
import { ILikeModelEntity } from "../../infrastructure/db/interface/like"
import { IUserModelEntity } from "../../infrastructure/db/interface/user"

export interface addArticle {
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
   createdBy: string,
}

export interface likeData {
   userId: string
   articleId: string
}

export interface editArticle {
   _id: string
   title: string,
   description: string,
   image: string | null,
   tags: string[],
   category: string,
}

export interface getUserBaseArticleData {
   _id:string
   title: string,
   description: string,
   image: string,
   tags: string[],
   category: string,
   like: string[],//username
   dislike: string[]//username
   block: string[]//username
}

export interface likeAggregateUser extends ILikeModelEntity {
   userDetails:IUserModelEntity
}


export interface getPreferenceBaseArticleData extends getUserBaseArticleData {
   username:string
}

export interface articleAggregateByUser extends IArticleModelEntity {
   userDetails:IUserModelEntity
}
