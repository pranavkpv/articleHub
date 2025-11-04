import { IAdminModelEntity } from "../../db/interface/admin";

export interface IAdminRepository {
   findAdminById(id:string):Promise<IAdminModelEntity | null>
}