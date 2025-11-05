import { commonOutput } from "../../../domain/entities/common";

export interface IDeleteArticleUseCase {
   execute(id: string): Promise<commonOutput>
}