import { refreshOutput } from "../../../domain/entities/user";


export interface IRefreshTokenUsecase {
   execute(token:string):Promise<refreshOutput>
}