import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import Basic from "../../components/templates/basic"
import { GlobalContext } from '../../context/GlobalState'
import db from '../../config/firebase'
import { doc, onSnapshot } from '@firebase/firestore'
import dynamic from 'next/dynamic'

export default function School({ id }) {

  const Map = dynamic(() => import("../../components/map"), { ssr: false });

  const [ stateSchool, setStateSchool ] = useState({})
  const [ stateLatLon, setStateLatLon ] = useState([])

  useEffect(()=>{

    const unsub = onSnapshot(doc(db, "schools", id), (snapshot)=>{

      setStateSchool(snapshot.data())

    })

    return unsub

  },[])

  useEffect(()=>{

    const latlon = stateSchool?.geoaddress?.split(":")[1].split("?")[0].split(",")
    setStateLatLon(latlon)


  }, [stateSchool])

  return (
    <Basic>
      <div className="p-30px">
        <h1 className="font-bold text-xl">{stateSchool.name}</h1>
      </div>
      <div className="p-30px flex space-x-10">
        <div>
          <div>
            {
              [
                "type",
                "district"
              ].map((item,i)=>(
                stateSchool[item] ? <div className="capitalize">{item}: {stateSchool[item]}</div> : null
              ))
            }
          </div>
        </div>
        <div className="flex-grow relative">
          <Map latlon={stateLatLon} school={stateSchool} />
        </div>

      </div>
      
    </Basic>
  )
}

export async function getServerSideProps({ params }){
  return {
    props: {
      id: params.id
    }
  }
}