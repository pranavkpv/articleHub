import { listingInput } from "../../../domain/entities/event";
import { listVolunteerOutput } from "../../../domain/entities/output";
import { volunteer } from "../../../domain/shared/messages/volunteer";
import { HTTP_STATUS } from "../../../domain/shared/Status";
import { IVolunteerRepository } from "../../../infrastructure/repositories/interface/IVolunteerRepository";
import { IGetVolunteerListUsecase } from "../interface/IGetVolunteerListUsecase";

export class GetVolunteerListUsecase implements IGetVolunteerListUsecase {
   constructor(
      private _volunteerRepository: IVolunteerRepository
   ) { }
   async execute(datas: listingInput): Promise<listVolunteerOutput> {
      const { data, total } = await this._volunteerRepository.getAllVoulunteer(datas)
      return {
         data,
         message: volunteer.fetchSuccess,
         status: HTTP_STATUS.OK,
         success: true,
         total
      }
   }
}