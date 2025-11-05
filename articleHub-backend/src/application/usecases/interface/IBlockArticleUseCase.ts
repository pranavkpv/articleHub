import { likeData } from "../../../domain/entities/article";
import { commonOutput } from "../../../domain/entities/common";

export interface IBlockArticleUseCase{
   execute(data:likeData):Promise<commonOutput>
}