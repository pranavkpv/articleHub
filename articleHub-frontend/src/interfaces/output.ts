import type { categoryData } from "./category"
import type { ProfileData, tokenData } from "./user"

export interface commonResponse {
   success: boolean
   message: string
}

export interface listCategoryOutput extends commonResponse {
   data: categoryData[]
}

export interface loginResponse extends commonResponse {
   data:tokenData
}

export interface getUserReposnse extends commonResponse {
   data:ProfileData | null
}