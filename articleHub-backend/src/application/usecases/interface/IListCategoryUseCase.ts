import { listCategoryOutput } from "../../../domain/entities/category";

export interface IListCategoryUseCase {
   execute(): Promise<listCategoryOutput>
}