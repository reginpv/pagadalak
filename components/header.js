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
        <Link href="/"><a><Image src="/images/logo.png" width="150" height="150" alt="Pagadalak" /></a></Link>
        <Link href="/"><a><h2 className="hidden text-2xl lg:text-3xl lg:block truncate">Camiling Educational Institution Finder</h2></a></Link>
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
          <li className="truncate">
            {
              isLoggedIn() ?
              <>
                <span className="hidden md:inline-block">Welcome {user.name},&nbsp;</span> 
                <button role="button" onClick={e=>handeLogout()}>Logout</button>
              </> : 
              null
            }
          </li>
        </ul>
      </div>
    </header>
  )
}