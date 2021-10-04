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

    console.log(stateSchool)

  }, [stateSchool])

  return (
    <Basic>
      <div className="p-30px">
        <h1 className="font-bold text-xl">{stateSchool.name}</h1>
      </div>
      <div className="p-30px flex flex-col-reverse md:flex-row md:space-x-10">
        <div>
          <table className="table-auto" cellPadding="5">
            <tbody>
              <tr>
                <td>Type</td>
                <td>:</td>
                <td className="capitalize"> {stateSchool.type}</td>
              </tr>
              {
                stateSchool?.district!=="" && stateSchool.type=="public" ?
                <tr>
                  <td>District</td>
                  <td>:</td>
                  <td className="capitalize"> {stateSchool.district}</td>
                </tr> : 
                null
              }
              {
                stateSchool?.elementary ?
                <tr>
                  <td>Elementary</td>
                  <td>:</td>
                  <td className="capitalize"> {stateSchool?.elementaryTuition}</td>
                </tr> : 
                null
              }
              {
                stateSchool?.juniorHighSchool ?
                <tr>
                  <td>Junior High School</td>
                  <td>:</td>
                  <td className="capitalize"> {stateSchool?.juniorHighSchoolTuition}</td>
                </tr> : 
                null
              }
              {
                stateSchool?.seniorHighSchool ?
                <tr>
                  <td>Senior High School</td>
                  <td>:</td>
                  <td className="capitalize"> {stateSchool?.seniorHighSchoolTuition}</td>
                </tr> : 
                null
              }
              {
                stateSchool?.modularLearning || stateSchool?.blendedLearning || stateSchool?.onlineLearning ?
                <tr>
                  <td>Strategy</td>
                  <td>:</td>
                  <td className="capitalize">
                    <ul>
                      {
                        stateSchool?.modularLearning ? <li>Modular Leaning</li> : null
                      }
                      {
                        stateSchool?.blendedLearning ? <li>Blended Leaning</li> : null
                      }
                      {
                        stateSchool?.onlineLearning ? <li>Online Leaning</li> : null
                      }
                    </ul>
                  </td>
                </tr> : 
                null
              }
            </tbody>
          </table>
        </div>
        <div className="flex-grow">
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