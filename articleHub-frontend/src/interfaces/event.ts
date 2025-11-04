export interface Reward {
   title: string;
   price: string;
}
export interface participantData {
   id: string
   status: boolean
}

export interface addEventData {
   event_name: string;
   start_date: string;
   end_date: string;
   location: string;
   description: string;
   rewards: Reward[];
   image: File | null;
   hosted_by: string;
   guests: string[];
   meal_count: string;
   max_tickets: string;
}


export interface listEventOnAdmin {
   _id:string
   event_name: string
   start_date: Date
   end_date: Date
   location: string
   description: string
   rewards: Reward[]
   image: string
   hosted_by: string
   guests: string[]
   volunteers: string[]
   meal_count: number
   participants: participantData[]
   judges: string[]
   max_tickets: number
}

export interface ticketData {
   event_name: string
   start_date: Date
   end_date: Date
   location: string
   description: string
   rewards: Reward[]
   image: string
   hosted_by: string
   guests: string[]
   meal_count: number
   max_tickets: number
}

export interface listEventOnUser {
   _id:string
   event_name: string
   start_date: Date
   end_date: Date
   location: string
   description: string
   rewards: Reward[]
   image: string
   hosted_by: string
   guests: string[]
   meal_count: number
   max_tickets: number
}

