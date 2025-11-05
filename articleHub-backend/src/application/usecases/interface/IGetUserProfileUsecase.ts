import { getuserProfileData } from "../../../domain/entities/user";

export interface IGetUserProfileUsecase {
   execute(id: string): Promise<getuserProfileData>
}