export interface Reward {
   title: string;
   price: string;
}

export interface addEventData {
   event_name: string;
   start_date: string;
   end_date: string;
   location: string;
   description: string;
   rewards: Reward[];
   image: string | null;
   hosted_by: string;
   guests: string[];
   meal_count: string;
   max_tickets: string;
}

export interface attendanceData {
   event: string, 
   user: string, 
   status:boolean
}

export interface listingInput {
   search:string 
   page:number
}