//
// Packages
//
import { useEffect } from 'react'
import { useRouter } from 'next/router'

//
// Components
//
import FormLogin from '../components/formLogin'
import Basic from '../components/templates/basic'
import { isLoggedIn } from '../lib/helper'

export default function Login() {

  const router = useRouter()

  useEffect(()=>{

    if(isLoggedIn()){
      router.push("/")
    }

  },[])

  return (
    <Basic
      classMain="flex items-center justify-center mb-10"
    >
      <div className="px-30px py-3 md:py-30px w-full max-w-screen-sm">
        <h1 className="mb-1 text-center text-24px font-bold">Admin Login</h1>
        <p className="mb-5 text-center">For admin use only.</p>
        <FormLogin className="grid gap-5" />
      </div>
    </Basic>
  )
}
