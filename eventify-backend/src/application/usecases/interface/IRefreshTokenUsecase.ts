import { refreshOutput } from "../../../domain/entities/output";

export interface IRefreshTokenUsecase {
   execute(token:string):Promise<refreshOutput>
}