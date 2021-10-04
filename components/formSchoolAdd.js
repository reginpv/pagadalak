import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { addDoc, collection } from '@firebase/firestore'
import db from '../config/firebase'
import { GlobalContext } from '../context/GlobalState'


export default function FormSchoolAdd({ className }){

  const router = useRouter()

  const [ stateIsLoading, setStateIsLoading ] = useState(false)

  const handleAdd = async e => {

    e.preventDefault()

    setStateIsLoading(true)

    const el = document.querySelector('[data-form-message]')
    el.innerHTML = null

    const name = e.target.name.value

    let errors = []

    const input = {
      type: "text",
      name: "name",
      validation: {
        required: true,
        'invalid-feedback': "Name is required."
      }
    }

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

    // Validate
    if(errors.length > 0) {
      setStateIsLoading(false)
      return false
    }

    try {
      // Api call
      const collectionRef = collection(db, "schools")
      const payload = { name }
      const docRef = await addDoc(collectionRef, payload)

      if(docRef?.id) {
        router.push(`/admin/school/${docRef.id}`)
      } else {
        el.innerHTML = `<div class="text-center bg-red-50 text-red-500 py-3">Error adding to database, please contact administrator</div>`

      }

    } catch(err){
      console.log("err: ", err)
    }

    setStateIsLoading(false)

  }

  return(
    <form method="post" onSubmit={e=>handleAdd(e)} className={className}>
      

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