import { getUserBaseArticleData } from "../../../domain/entities/article";

export interface IGetUserBaseArticleUseCase {
   execute(id:string):Promise<getUserBaseArticleData[]>
}