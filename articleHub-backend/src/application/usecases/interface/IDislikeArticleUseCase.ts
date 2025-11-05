import { likeData } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";

export interface IDislikeArticleUseCase {
   execute(data:likeData):Promise<commonOutput>
}