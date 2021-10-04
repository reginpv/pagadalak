import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, setDoc, onSnapshot } from '@firebase/firestore'
import { GlobalContext } from '../context/GlobalState'
import db from '../config/firebase'

export default function FormSchoolEdit({ className, schoolId,  school }){

  const { editUser } = useContext(GlobalContext)
  const router = useRouter()

  const [ stateIsLoading, setStateIsLoading ] = useState(false)
  const [ stateSchool, setStateSchool ] = useState({})

  useEffect(()=>{

    const unsub = onSnapshot(doc(db, "schools", schoolId), (snapshot)=>{

      setStateSchool(snapshot.data())

    })

    return unsub

  },[])


  const handleEdit = async (e) => {

    e.preventDefault()

    setStateIsLoading(true)

    const docRef = doc(db, "schools", schoolId)
    const docSnap = await setDoc(docRef, stateSchool)

    setStateIsLoading(false)

  }


  return(
    <form method="POST" onSubmit={e=>handleEdit(e)} className={className}>

      {
        console.log(stateSchool)
      }

      <div className="">
        <input className="w-full focus:outline-none p-3 border" type="text" name="name" placeholder="Please enter school name" value={stateSchool?.name || ``} onChange={e=>setStateSchool({...stateSchool,name: e.target.value})} />
        <span className="text-red-500 text-14px hidden px-1">School name is required</span>
      </div>

      <div className="">
        <select className="w-full focus:outline-none p-3 border" name="type" value={stateSchool?.type || ``} onChange={e=>setStateSchool({...stateSchool, type: e.target.value})}>
          <option value="">Please select type</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div className="">
        <select className="w-full focus:outline-none p-3 border" name="district" value={stateSchool?.district || ``} onChange={e=>setStateSchool({...stateSchool, district: e.target.value})}>
          <option value="">Please select district</option>
          <option value="Central District">Central District</option>
          <option value="East District">East District</option>
          <option value="West Disctrict">West District</option>
        </select>
      </div>

      <div className="">
        <input className="w-full focus:outline-none p-3 border" type="text" name="geoaddress" placeholder="Please enter geo address" value={stateSchool?.geoaddress || ``} onChange={e=>setStateSchool({...stateSchool, geoaddress: e.target.value})} />
        <span className="text-red-500 text-14px hidden px-1">Geo address is required</span>
      </div>

      <div data-form-message></div>

      <button role="submit" className="border p-3 bg-gray-100">
        {
          stateIsLoading ? `Please wait, updating school...` : `Edit`
        }
      </button>

    </form>
  )
}