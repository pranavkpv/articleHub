import type { listEventOnAdmin, listEventOnUser } from "./event"
import type { listVolunter, tokenData, volunteerGet } from "./user"

export interface commonResponse {
   success: boolean
   message: string
}


export interface loginResponse extends commonResponse {
   data: tokenData
}

export interface fetchAdminEvent extends commonResponse {
   data: listEventOnAdmin[]
}

export interface fetchUserEvent extends commonResponse {
   data: listEventOnUser[]
}

export interface fetchVounteerReponse extends commonResponse {
   data: listVolunter[]
   total: number
}

export interface getlistVounteer extends commonResponse {
   data: volunteerGet[]
}

