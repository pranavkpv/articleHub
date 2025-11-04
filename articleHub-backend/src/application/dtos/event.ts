import { participantData, rewardData } from "../../infrastructure/db/interface/event";

export interface adminEventDto {
   _id:string
   event_name: string
   start_date: Date
   end_date: Date
   location: string
   description: string
   rewards: rewardData[]
   image: string
   hosted_by: string
   guests: string[]
   volunteers: string[]
   meal_count: number
   participants: participantData[]
   judges: string[]
   max_tickets: number
}

export interface userEventDto {
   _id:string
   event_name: string
   start_date: Date
   end_date: Date
   location: string
   description: string
   rewards: rewardData[]
   image: string
   hosted_by: string
   guests: string[]
   meal_count: number
   max_tickets: number
}