import { IAdminModelEntity } from "../../db/interface/admin";
import { adminDB } from "../../db/model/admin";
import { IAdminRepository } from "../interface/IAdminRepository";

export class AdminRepository implements IAdminRepository {
   async findAdminById(id: string): Promise<IAdminModelEntity | null> {
      return adminDB.findById(id)
   }
}