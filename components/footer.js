import Link from 'next/link'
import { isLoggedIn } from '../lib/helper'

export default function footer(){
  return(
    <footer className="px-30px py-3 md:py-30px text-center text-12px md:text-16px">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div></div>
        <div>
          <p>&copy; 2021 All Rights Reserved. Pagadalak.com</p>
          <p>Tarlac, Philippines</p>
        </div>
        <div>
          {
              !isLoggedIn() ?
              <>
                <Link href="/login"><a className="text-white text-12px">Admin Login</a></Link>
              </> : 
              null
            }
        </div>
      </div>
    </footer>
  )
}