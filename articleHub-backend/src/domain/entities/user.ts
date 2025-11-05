export interface signupData {
   firstname: string;
   lastname: string;
   email: string;
   phone: string;
   password: string;
   confirmPassword: string;
   DOB: string;
   preference: string[]
}

export interface tempUserData {
   firstname: string;
   lastname: string;
   email: string;
   phone: string;
   password: string;
   DOB: string;
   preference: string[]
   otp: string;
   otpCreatedAt: Date
}

export interface verifyOtpData {
   email: string
   otp: string
}


export interface registerUserData {
   firstname: string
   lastname: string
   email: string
   phone: string
   password: string
   DOB: string;
   preferences: string[]
}

export interface resendOtpData {
   email: string
   otp: string;
   otpCreatedAt: Date
}

export interface loginData {
   email: string
   password: string
}

export interface generateTokenData {
   _id: string
   role: string
}

export interface tokenData {
   accessToken: string;
   refreshToken: string;
   role: string;
}

export interface JwtPayloadData extends generateTokenData {
   iat?: number;
   exp?: number;
}

export interface foodAdd {
   userId: string
   eventId: string
}

export interface loginOutput {
   success: boolean
   message: string
   status: number
   data: tokenData
}

export interface refreshOutput {
   success: boolean
   message: string
   status: number
   data: string
}

export interface editPassword {
   _id: string
   currentpassword: string
   newpassword: string
}
export interface editPasswordRepo {
   _id: string
   password: string
}

export interface getuserProfileData {
   _id: string
   firstname: string
   lastname: string
   email: string
   phone: string
   DOB: Date;
   preferences: string[]
   image:string
}