//
// Packages
//
import { useEffect } from 'react'

//
// Helpers
//
// import fire from '../../config/firebase'

//
// Components
//
import Basic from "../../components/templates/basic"

export default function Admin() {

  useEffect(()=>{

    

  },[])

  return (
    <Basic
      auth={true}
    >
      <div className="p-30px">
        Welcome to admin
      </div>
    </Basic>
  )
}