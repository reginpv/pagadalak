import { useEffect, useState, useContext } from 'react'
import formSearchInputs from '../data/formSearchInputs.json'
import { collection, query, where, getDocs } from '@firebase/firestore'
import db from '../config/firebase'
import { GlobalContext } from '../context/GlobalState'

export default function FormSearch({ className }){

  const { editSearchResults } = useContext(GlobalContext)

  const [ stateType, setStateType ] = useState("")
  const [ stateTerms, setStateTerms] = useState({type: "", level: "", ["strategy"]: "", ["tuition"]: ""})

  useEffect(async ()=>{

    console.log(stateTerms)

    let results = []
    const schoolsRef = collection(db, "schools")
    const q = query(schoolsRef, where("type", "==", stateTerms.type))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data());

      results.push({
        ...doc.data(),
        id: doc.id
      })
      
    })

    editSearchResults(results)

  },[ stateTerms ])


  return(
    <form className={className}>
      {
        formSearchInputs.map(input=>(
          <div key={input.name} className="p-3 border font-bold">
            <label>{input.label}</label>
            <select 
              name={input.name} 
              defaultValue={stateTerms[`${input.name}`]} 
              onChange={e=>setStateTerms({...stateTerms, [`${input.name}`]:e.target.value})} 
              className={`focus:outline-none w-full`}
            >
              <option value="">{`Select ${input.label}`}</option>
              {
                input.options.map(option=>(
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))
              }
            </select>
            <span className="text-red-500 text-14px hidden">{input.validation['invalid-feedback']}</span>
          </div>
        ))
      }
    </form>
  )
}