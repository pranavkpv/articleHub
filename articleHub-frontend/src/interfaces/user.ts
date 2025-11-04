export interface signupData {
   firstname: string;
   lastname:string;
   email: string;
   phone: string;
   password: string;
   confirmPassword: string;
   DOB:string
   preference:string[]
}

export interface verifyOtpData {
   email:string 
   otp:string
}

export interface loginData {
   email: string;
   password: string;
}

export interface tokenData {
   token:string 
   role:string
}

export interface tokenExist {
   _id:string 
   role:string 
   exp:number
   iat:number
}

export interface addVolunteerData {
   username:string
   email:string
   phone:string
}

export interface listVolunter extends addVolunteerData {
   _id:string
}

export interface fetchVolunteerData {
   page:number, 
   search:string
}

export interface volunteerGet {
   _id:string 
   username:string
}