//
// Packages
//
import { useContext, useState } from 'react'

//
// Helpers
//
import { GlobalContext } from '../context/GlobalState'

//
// data
//
import formLoginInputs from '../data/formLoginInputs.json'

export default function FormLogin({ className }){

  const { user, editUser } = useContext(GlobalContext)

  const [ stateIsLoading, setStateIsLoading ] = useState(true)

  const handleLogin = e => {

    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value

    let errors = []

    formLoginInputs.forEach(input => {

      let target = document.querySelector(`[name="${input.name}"]`)
      let mess = document.querySelector(`[name="${input.name}"] + span`)

      if(input.validation.required && (target?.value==undefined || target.value=="")) {

        errors.push(`${input.name}`)
        target?.classList.add('bg-red-50', 'border-red-500', 'invalid')
        mess?.classList.remove('hidden')

      } else {

        target?.classList.remove('bg-red-50', 'border-red-500', 'invalid')
        mess?.classList.add('hidden')

      }

    })

    // Validate
    if(errors.length > 0) {
      setStateIsLoading(false)
      return false
    }

  }

  return(
    <form method="post" onSubmit={e=>handleLogin(e)} className={className}>
      {
        formLoginInputs.map(input=>(
          <div key={input.name} className="">
            <input className="w-full focus:outline-none p-3 border" type={input.type} name={input.name} placeholder={input.label} />
            <span className="text-red-500 text-14px hidden px-1">{input.validation['invalid-feedback']}</span>
          </div>
        ))
      }
      <button role="submit" className="border p-3 bg-gray-100">Login</button>
    </form>
  )
}