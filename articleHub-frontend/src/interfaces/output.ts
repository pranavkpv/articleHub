import type { categoryData } from "./category"
import type { tokenData } from "./user"

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