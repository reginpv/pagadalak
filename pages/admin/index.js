//
// Packages
//
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

//
// Helpers
//
import { GlobalContext } from '../../context/GlobalState'
import { isLoggedIn } from '../../lib/helper'

//
// Components
//
import Basic from "../../components/templates/basic"

export default function Admin() {

  const { user, editUser } = useContext(GlobalContext)
  const router = useRouter()

  useEffect(()=>{

    if(isLoggedIn()){
      editUser(JSON.parse(Cookies.get('_paga')))
      //router.push("/login")
    } else {
      router.push("/login")
    }
    
  },[])

  return (
    <Basic>
      <div className="p-30px">
        Welcome to admin
      </div>
    </Basic>
  )
}