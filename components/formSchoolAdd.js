//
// Packages
//
import { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import router, { useRouter } from 'next/router'

//
// Helpers
//
import { GlobalContext } from '../context/GlobalState'
import { HOSTNAME } from '../config/constants'

//
// data
//
import formLoginInputs from '../data/formLoginInputs.json'

export default function FormSchoolAdd({ className }){

  const { editUser } = useContext(GlobalContext)
  const router = useRouter()

  const [ stateIsLoading, setStateIsLoading ] = useState(false)

  const handleLogin = e => {

    e.preventDefault()

    setStateIsLoading(true)

    const el = document.querySelector('[data-form-message]')
    el.innerHTML = null

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

    // Api call
    let formData = {
      username,
      password
    }
    fetch(`${HOSTNAME}/api/users/login`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res=>res.json())
      .then(data=> {

        if(data?.name) {

          // Cookie
          Cookies.set('_paga', JSON.stringify(data))

          editUser(data)

          router.push("/admin")

        } else {
          
          el.innerHTML = `<div class="text-center bg-red-50 text-red-500 py-3">User not found or credentials do not match.</div>`
          
        }

        setStateIsLoading(false)

      })
      .catch(err=>{
        console.log('err: ', err) 
        el.innerHTML = `<div class="text-center bg-red-50 text-red-500 py-3">${err}.</div>`
        setStateIsLoading(false) 
      })

  }

  return(
    <form method="post" onSubmit={e=>handleLogin(e)} className={className}>
      
      <div className="">
        <input className="w-full focus:outline-none p-3 border" type="text" name="name" placeholder="Please enter school name" />
        <span className="text-red-500 text-14px hidden px-1">School name is required</span>
      </div>

      <div data-form-message></div>

      <button role="submit" className="border p-3 bg-gray-100">
        {
          stateIsLoading ? `Please wait, adding school...` : `Submit`
        }
      </button>
    </form>
  )
}