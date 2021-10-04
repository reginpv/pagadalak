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

    const required = ["name", "type"]

    console.log(e.target.tuitionElementary)

    const name = e.target.name.value
    const type = e.target.type.value
    const district = e.target.district.value
    const geoaddress = e.target.geoaddress.value
    const elementary = e.target.elementary.checked
    const juniorHighSchool = e.target.juniorHighSchool.checked
    const seniorHighSchool = e.target.seniorHighSchool.checked
    const elementaryTuition = e.target.elementaryTuition.value
    const juniorHighSchoolTuition = e.target.juniorHighSchoolTuition.value
    const seniorHighSchoolTuition = e.target.seniorHighSchoolTuition.value
    const modularLearning = e.target.modularLearning.checked
    const blendedLearning = e.target.blendedLearning.checked
    const onlineLearning = e.target.onlineLearning.checked
    const abm = e.target.abm.checked
    const hums = e.target.hums.checked
    const stem = e.target.stem.checked
    const tvl = e.target.tvl.checked

    let errors = []

    required.forEach(item => {

      let target = document.querySelector(`[name="${item}"]`)
      let mess = document.querySelector(`[name="${item}"] + span`)

      if(target?.value==undefined || target.value=="") {

        errors.push(`${item}`)
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

    try {
      // Api call
      const collectionRef = collection(db, "schools")
      const payload = { 
        name,
        type,
        district,
        geoaddress,
        elementary: elementary,
        juniorHighSchool: juniorHighSchool,
        seniorHighSchool: seniorHighSchool,
        elementaryTuition,
        juniorHighSchoolTuition,
        seniorHighSchoolTuition,
        modularLearning: modularLearning,
        blendedLearning: blendedLearning,
        onlineLearning: onlineLearning,
        abm: abm,
        hums: hums,
        stem: stem,
        tvl: tvl
      }
      console.log(payload)
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

      <div className="grid md:grid-cols-2 gap-3">
        <div className="">
          <select className="w-full focus:outline-none p-3 border" name="type" defaultValue="">
            <option value="">Please select type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <span className="text-red-500 text-14px hidden px-1">Type name is required</span>
        </div>

        <div className="">
          <select className="w-full focus:outline-none p-3 border" name="district" defaultValue="">
            <option value="">Please select district</option>
            <option value="Central District">Central District</option>
            <option value="East District">East District</option>
            <option value="West Disctrict">West District</option>
          </select>
          <span className="text-red-500 text-14px hidden px-1">District is required</span>
        </div>
      </div>

      <div className="">
        <input className="w-full focus:outline-none p-3 border" type="text" name="geoaddress" placeholder="Geo address" />
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
              label: "Junior HS"
            },
            {
              name: "seniorHighSchool",
              label: "Senior HS"
            }
          ].map((item,i)=>(
            <div key={i} className="py-2 flex items-center justify-between">
              <div className="whitespace-nowrap">
                <input id={item.name} type="checkbox" name={item.name} value={true} />
                <label htmlFor={item.name} className="capitalize"> <span className="truncate">{item.label}</span></label>
              </div>
              <div>
                <select name={`${item.name}Tuition`} defaultValue="" className="border py-1 px-3">
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
              name: "hums",
              label: "HUMS"
            },
            {
              name: "stem",
              label: "STEM"
            },
            {
              name: "tvl",
              label: "TVL"
            }
          ].map((item,i)=>(
            <div key={i} className="py-2 flex items-center justify-between">
              <div className="whitespace-nowrap">
                <input id={item.name} type="checkbox" name={item.name} value={true} />
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
              <input id={item.name} type="checkbox" name={item.name} value={true} />
              <label htmlFor={item.name} className="capitalize"> {item.label}</label>
            </div>
          ))
        }
        
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