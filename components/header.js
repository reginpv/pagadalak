//
// Packages
//
import { useContext } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Image from 'next/image'

//
// Helpers
//
import { GlobalContext } from '../context/GlobalState'
import { isLoggedIn } from '../lib/helper'

export default function Header(){

  const { user, editUser } = useContext(GlobalContext)
  const router = useRouter()

  const handeLogout = () => {

    editUser({})
    Cookies.remove('_paga')
    router.push("/login")

  }

  return(
    <header className="px-30px py-3 md:py-30px flex justify-between items-center sticky top-0 bg-white bg-opacity-90">
      <div className="font-bold text-40px text-gray-700 uppercase flex items-center">
        <Link href="/"><a><Image src="/images/logo.png" width="90" height="90" alt="Pagadalak" /></a></Link>
        <h2 className="hidden md:block">Pagadalak.com</h2>
      </div>
      <div className="">
        <ul className="flex space-x-3 md:space-x-10">
          {
            user?.name ?
            <li>
              <Link href="/admin">
                <a>Dashboard</a>
              </Link>
            </li> : 
            null
          }
          <li>
            {
              isLoggedIn() ?
              <>
                <span className="hidden md:inline-block">Welcome {user.name},&nbsp;</span> 
                <button role="button" onClick={e=>handeLogout()}>Logout</button>
              </> : 
              <Link href="/login">
                <a>Login</a>
              </Link>
            }
          </li>
        </ul>
      </div>
    </header>
  )
}