import type { listEventOnAdmin, listEventOnUser } from "./event"
import type { listVolunter } from "./user"

export interface InputProp {
   type: string
   id: string
   value: string
   handle: (e: React.ChangeEvent<HTMLInputElement>) => void
   labelname: string
   placeholder: string
}

export interface SubmitButtonProp {
   buttonValue: string
}

export interface addProp {
   addOn: boolean
   setAddOn: React.Dispatch<React.SetStateAction<boolean>>
}

export interface eventListProp {
   event:listEventOnAdmin
   data:string
   fetchEventData:()=>void
}

export interface userEventListProp {
   events:listEventOnUser[]
   status:string
}

export interface eventConfirmProp extends addProp {
    event:string
}

export interface qrConfirmOn extends eventConfirmProp {
   setconfirmOn: React.Dispatch<React.SetStateAction<boolean>>
}

export interface scanProp {
   scanOn:boolean
   setScanOn:React.Dispatch<React.SetStateAction<boolean>>
   event:string
   eventBase:string
}

export interface listVolunteerProp {
   listOn:boolean
   setListOn:React.Dispatch<React.SetStateAction<boolean>>
   event:listEventOnAdmin
   fetchEventData:()=>void
}

export interface editEventProp {
   editOn:boolean
   setEditOn:React.Dispatch<React.SetStateAction<boolean>>
   event:listEventOnAdmin
   fetchEventData:()=>void
}

export interface editVolunteerProp {
   editOn:boolean
   setEditOn:React.Dispatch<React.SetStateAction<boolean>>
   data:listVolunter
   loadVolunteers:()=>void
}