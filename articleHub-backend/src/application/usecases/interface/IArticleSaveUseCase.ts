import { addArticle } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";

export interface IArticleSaveUseCase {
   execute(data:addArticle):Promise<commonOutput>
}