import { volunteerDTO } from "../../application/dtos/volunteer"
import { commonOutput } from "./output"

export interface addVolunteerData {
   username:string
   email:string
   phone:string
}

export interface addVoluntRepos extends addVolunteerData {
   password:string
}

export interface listVoluntResponse extends commonOutput {
   data:volunteerDTO[]
}

export interface assignVolunteerInput {
   data:string[]
   event:string
}

export interface editVolunteerData extends addVolunteerData {
   _id:string
}

export interface editVolunteerRepo extends editVolunteerData {
  password:string
}