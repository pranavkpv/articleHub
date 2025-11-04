import { commonOutput } from "../../../domain/entities/output";

export interface ITakeAttendanceUseCase {
   execute(data: string): Promise<commonOutput>
}