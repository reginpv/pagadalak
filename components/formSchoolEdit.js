import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, setDoc, onSnapshot } from '@firebase/firestore'
import { GlobalContext } from '../context/GlobalState'
import db from '../config/firebase'

export default function FormSchoolEdit({ className, schoolId }){

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
    const docSnap = await setDoc(docRef, {
      ...stateSchool,
      tuitionRange: [stateSchool?.elementaryTuition, stateSchool?.juniorHighSchoolTuition, stateSchool?.seniorHighSchoolTuition]
    })

    setStateIsLoading(false)

  }


  return(
    <form method="POST" onSubmit={e=>handleEdit(e)} className={className}>

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

      {
        stateSchool?.type == "public" ?
          <div className="">
            <select className="w-full focus:outline-none p-3 border" name="district" value={stateSchool?.district || ``} onChange={e=>setStateSchool({...stateSchool, district: e.target.value})}>
              <option value="">Please select district</option>
              <option value="Central District">Central District</option>
              <option value="East District">East District</option>
              <option value="West District">West District</option>
            </select>
          </div> : null
      }

      <div className="">
        <input className="w-full focus:outline-none p-3 border" type="text" name="geoaddress" placeholder="Please enter geo address" value={stateSchool?.geoaddress || ``} onChange={e=>setStateSchool({...stateSchool, geoaddress: e.target.value})} />
        <span className="text-red-500 text-14px hidden px-1">Geo address is required</span>
      </div>

      <div className="">
        <h3 className="font-bold">Please select levels</h3>
        {
          [
            {
              name: "elementary",
              label: "Elementary"
            },
            {
              name: "juniorHighSchool",
              label: "Junior high-school"
            },
            {
              name: "seniorHighSchool",
              label: "Senior high-school"
            }
          ].map((item,i)=>(
            <div key={i} className="py-2 flex items-center justify-between">
              <div className="whitespace-nowrap">
                <input 
                  id={item.name} 
                  type="checkbox" 
                  checked={stateSchool[`${item.name}`]} 
                  name={item.name} 
                  value={true}
                  onChange={e=>setStateSchool({...stateSchool, [`${item.name}`]: stateSchool[`${item.name}`] ? false : true})
                  }
                />
                <label htmlFor={item.name} className="capitalize"> <span className="truncate">{item.label}</span></label>
              </div>
              <div>
                <select name={`${item.name}Tuition`} value={stateSchool[`${item.name}Tuition`]} className="border py-1 px-3" onChange={e=>setStateSchool({...stateSchool, [`${item.name}Tuition`]: e.target.value})}>
                  <option value="">Please tuition range</option>
                  <option value="Free">Free</option>
                  <option value="P1-P20,000">P1-P20,000</option>
                  <option value="P21,000-P39,999">P21,000-P39,999</option>
                  <option value="P40,000-P59,999">P40,000-P59,999</option>
                  <option value="P60,000 above">P60,000 above</option>
                </select>
              </div>
            </div>
          ))
        }
        
      </div>

      <div className="">
        <h3 className="font-bold">Strands (for senior high school only)</h3>
        {
          [
            {
              name: "abm",
              label: "ABM"
            },
            {
              name: "humss",
              label: "HUMSS"
            },
            {
              name: "stem",
              label: "STEM"
            },
            {
              name: "tvl",
              label: "TVL"
            },
            {
              name: "gas",
              label: "GAS"
            }
          ].map((item,i)=>(
            <div key={i} className="py-2 flex items-center justify-between">
              <div className="whitespace-nowrap">
                <input 
                  id={item.name} 
                  type="checkbox" 
                  name={item.name} 
                  checked={stateSchool[`${item.name}`]}
                  value={true}
                  onChange={e=>setStateSchool({...stateSchool, [`${item.name}`]: stateSchool[`${item.name}`] ? false : true})
                  }
                />
                <label htmlFor={item.name} className="capitalize"> <span className="truncate">{item.label}</span></label>
              </div>
            </div>
          ))
        }
      </div>

      <div className="">
        <h3 className="font-bold">Please select strategy</h3>
        {
          [
            {
              name: "modularLearning",
              label: "Modular Learning"
            },
            {
              name: "blendedLearning",
              label: "Blended Learning"
            },
            {
              name: "onlineLearning",
              label: "Online Learning"
            }
          ].map((item,i)=>(
            <div key={i} className="py-2">
              <input 
                id={item.name} 
                type="checkbox" 
                name={item.name} 
                checked={stateSchool[`${item.name}`]}
                value={true}
                onChange={e=>setStateSchool({...stateSchool, [`${item.name}`]: stateSchool[`${item.name}`] ? false : true})
                  }
              />
              <label htmlFor={item.name} className="capitalize"> {item.label}</label>
            </div>
          ))
        }
        
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