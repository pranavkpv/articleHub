import { commonOutput } from "../../../domain/entities/output";
import { volunteer } from "../../../domain/shared/messages/volunteer";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IDeleteVolunteerUseCase } from "../interface/IDeleteVolunteerUseCase";

export class DeleteVolunteerUseCase implements IDeleteVolunteerUseCase {
   constructor(
private _volunteerRepository:IVolunteerRepository
   ){}
   async execute(id: string): Promise<commonOutput> {
       await this._volunteerRepository.updateDeleteStatusVolunteer(id)
       return{
         message:volunteer.delete,
         status:HTTP_STATUS.OK,
         success:true
       }
   }
}