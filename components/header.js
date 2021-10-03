//
// Packages
//
import { useContext } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

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
    <header className="p-30px flex justify-between items-center">
      <div className="font-bold text-40px text-gray-700 uppercase">
        <Link href="/"><a>Logo</a></Link>
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
                <a href="#" onClick={e=>handeLogout()}>Logout</a>
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