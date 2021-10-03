//
// Packages
//
import { useContext, useEffect } from 'react'
import Cookies from 'js-cookie'

//
// Helpers
//
import { GlobalContext } from '../../context/GlobalState'
import { isLoggedIn } from '../../lib/helper'

//
// Components
//
import Footer from '../footer'
import Header from '../header'
import Meta from './meta'

const Basic = ({ children, className, classMain, meta }) => {

  const { user, editUser } = useContext(GlobalContext)

  useEffect(()=>{

    if(isLoggedIn()){
      editUser(JSON.parse(Cookies.get('_paga')))
    }

  },[])

  return(
    <>
      <Meta {...meta} />
      <div className={`template template--basic min-h-screen flex flex-col text-16px ${className}`}>
        <Header />
        <main className={`flex-grow ${classMain}`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
export default Basic;