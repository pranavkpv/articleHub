import { getPreferenceBaseArticleData } from "../../../domain/entities/article";

export interface IGetPreferenceBaseArticleUsecase{
   execute(id:string):Promise<getPreferenceBaseArticleData[]>
}