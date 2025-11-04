export interface signupData {
   username: string;
   email: string;
   phone: string;
   password: string;
   confirmPassword: string;
}

export interface tempUserData {
   username: string;
   email: string;
   phone: string;
   password: string;
   otp: string;
   otpCreatedAt: Date
}

export interface verifyOtpData {
   email: string
   otp: string
}


export interface registerUserData {
   username: string
   email: string
   phone: string
   password: string
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
