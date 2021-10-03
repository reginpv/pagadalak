//
// Packages
//
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

//
// Helpers
//


//
// Components
//
import Basic from "../../../components/templates/basic"
import FormSchoolAdd from '../../../components/formSchoolAdd'

export default function SchoolAdd() {

  useEffect(()=>{
    console.log(firebase)
  },[])

  return (
    <Basic
      classMain="flex items-center justify-center mb-10"
      auth={true}
    >
      <div className="p-30px max-w-screen-sm mx-auto w-full">
        <h1 className="mb-5 text-center text-24px font-bold">Add school</h1>
        <FormSchoolAdd className="grid gap-3" />
      </div>
    </Basic>
  )
}