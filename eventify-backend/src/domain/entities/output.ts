import { adminEventDto, userEventDto } from "../../application/dtos/event"
import { tokenData } from "./user"

export interface commonOutput {
   status: number
   success: boolean
   message: string
}
export interface volunteerData {
   _id: string
   username: string
   email: string
   phone: string
}

export interface loginOutput extends commonOutput {
   data: tokenData
}

export interface adminEventOutput extends commonOutput {
   data: adminEventDto[]
}

export interface userEventOutput extends commonOutput {
   data: userEventDto[]
}

export interface refreshOutput extends commonOutput {
   data: string
}

export interface listVolunteerOutput extends commonOutput {
   data: volunteerData[]
   total: number
}

export interface listVolRepo {
   data: volunteerData[]
   total: number
}
