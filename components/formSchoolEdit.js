//
// Packages
//
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, setDoc, onSnapshot } from '@firebase/firestore'

//
// Helpers
//
import { GlobalContext } from '../context/GlobalState'
import { HOSTNAME } from '../config/constants'
import db from '../config/firebase'

//
// data
//

export default function FormSchoolEdit({ className, schoolId,  school }){

  const { editUser } = useContext(GlobalContext)
  const router = useRouter()

  const [ stateIsLoading, setStateIsLoading ] = useState(false)
  const [ stateSchoolName, setStateSchoolName ] = useState("")
  const [ stateSchool, setStateSchool ] = useState({})

  useEffect(()=>{

    const unsub = onSnapshot(doc(db, "schools", schoolId), (snapshot)=>{

      setStateSchool({
        id:snapshot.id,
        ...snapshot.data()
      })

    })

    return unsub

  },[])


  const handleEdit = (async (e)=>{

    const docRef = doc(db, "schools", schoolId)
    const docSnap = await setDoc(docRef, stateSchool)

  })


  return(
    <form method="POST" onSubmit={e=>handleEdit(e)} className={className}>
      <div className="">
        <input className="w-full focus:outline-none p-3 border" type="text" name="name" placeholder="Please enter school name" value={stateSchool?.name || ``} onChange={e=>setStateSchool({...stateSchool,name: e.target.value})} />
        <span className="text-red-500 text-14px hidden px-1">School name is required</span>
      </div>

      <div data-form-message></div>

      <button role="submit" className="border p-3 bg-gray-100">
        {
          stateIsLoading ? `Please wait, adding school...` : `Edit`
        }
      </button>

    </form>
  )
}