import { commonOutput } from "../../../domain/entities/output";

export interface IMarkFoodAteUseCase {
   execute(data: string):Promise<commonOutput>
}