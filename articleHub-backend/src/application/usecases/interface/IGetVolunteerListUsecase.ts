import { listingInput } from "../../../domain/entities/event";
import { listVolunteerOutput } from "../../../domain/entities/output";

export interface IGetVolunteerListUsecase {
   execute(data: listingInput): Promise<listVolunteerOutput>
}