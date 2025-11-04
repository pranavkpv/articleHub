import { listingInput } from "../../../domain/entities/event";
import { listVolRepo } from "../../../domain/entities/output";
import { addVoluntRepos, editVolunteerData, editVolunteerRepo } from "../../../domain/entities/volunteer";
import { IVolunteerEntity } from "../../db/interface/volunteer";

export interface IVolunteerRepository {
   findUserByEmail(email: string): Promise<IVolunteerEntity | null>
   findVolunteerById(id: string): Promise<IVolunteerEntity | null>
   generateRandomPassword(): Promise<string>
   saveVolunteer(data: addVoluntRepos): Promise<boolean>
   getAllVoulunteer(data: listingInput): Promise<listVolRepo>
   findAllVolunteer(): Promise<IVolunteerEntity[]>
   updateDeleteStatusVolunteer(id: string): Promise<void>
   updateVolunteer(data: editVolunteerRepo): Promise<void>
   findUserByEmailInEdit(data:editVolunteerData):Promise<IVolunteerEntity | null>
}