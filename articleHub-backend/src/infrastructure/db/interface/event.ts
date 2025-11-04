export interface rewardData {
   title: string
   price: number
}

export interface participantData {
   id:string 
   status:boolean
}


export interface IEventModelEntity {
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
   participants:participantData[]
   judges:string[]
   max_tickets:number
   delete_status:boolean
}