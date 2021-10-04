import { useEffect, useState, useContext } from 'react'
import formSearchInputs from '../data/formSearchInputs.json'
import { GlobalContext } from '../context/GlobalState'

export default function FormSearch({ className }){

  const [ stateTerms, setStateTerms] = useState({type: "", level: "", ["strategy"]: "", ["tuition"]: ""})

  return(
    <form action="/search" method="get" className={className}>
      {
        formSearchInputs.map(input=>(
          <div key={input.name} className="p-3 border font-bold bg-white">
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

      <button role="submit" className="text-center m-auto my-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

    </form>
  )
}