import type { InputProp } from "../interfaces/prop"


function Input({type,id,value,handle,labelname,placeholder}:InputProp) {
   return (
      <div>
         <label htmlFor={id} className="block text-sm font-medium text-gray-700">{labelname}</label>
         <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={handle}
            placeholder={placeholder}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
         />
      </div>
   )
}
export default Input