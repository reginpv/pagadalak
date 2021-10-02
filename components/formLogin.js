import formLoginInputs from '../data/formLoginInputs.json'

export default function FormLogin({ className }){
  return(
    <form className={className}>
      {
        formLoginInputs.map(input=>(
          <div key={input.name} className="p-3 border font-bold">
            <input className="w-full focus:outline-none" type={input.type} name={input.name} placeholder={input.label} />
            <span className="text-red-500 text-14px hidden">{input.validation['invalid-feedback']}</span>
          </div>
        ))
      }
      <button role="submit" className="border p-3 bg-gray-100">Login</button>
    </form>
  )
}