import type { SubmitButtonProp } from "../interfaces/prop"

function UserSubmitButton({buttonValue}:SubmitButtonProp) {
   return (

      <button
         type="submit"
         className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
      >
         {buttonValue}
      </button>
   )
}

export default UserSubmitButton