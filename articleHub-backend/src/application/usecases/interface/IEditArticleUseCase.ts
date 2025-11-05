import { editArticle } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";

export interface IEditArticleUseCase {
   execute(data:editArticle):Promise<commonOutput>
}  