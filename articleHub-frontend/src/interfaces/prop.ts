export interface InputProp {
   type:string 
   id:string 
   value:string
   handle:(e: React.ChangeEvent<HTMLInputElement>)=>void
   labelname:string 
   placeholder:string
}