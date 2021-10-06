import { useEffect, useState } from "react"
import Basic from "../../components/templates/basic"
import db from '../../config/firebase'
import { doc, onSnapshot } from '@firebase/firestore'
import dynamic from 'next/dynamic'
import { useRouter } from "next/router"

export default function School({ id }) {

  const router  = useRouter()

  const Map = dynamic(() => import("../../components/map"), { ssr: false })


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
    <Basic
      classMain="flex w-full h-full"
    >
      <div className="px-30px py-3 md:py-30px flex-grow flex flex-col-reverse md:flex-row md:space-x-10">
        <div className="bg-white p-3">
          <h1 className="font-bold text-xl mt-5 mb-2 md:mt-0 md:mb-5">{stateSchool.name}</h1>
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="py-1">Type</td>
                <td className="py-1">:</td>
                <td className="py-1 capitalize"> {stateSchool.type}</td>
              </tr>
              {
                stateSchool?.district!=="" && stateSchool.type=="public" ?
                <tr>
                  <td className="py-1">District</td>
                  <td className="py-1">:</td>
                  <td className="py-1 capitalize"> {stateSchool.district}</td>
                </tr> : 
                null
              }
              {
                stateSchool?.elementary ?
                <tr>
                  <td className="py-1">Elementary</td>
                  <td className="py-1">:</td>
                  <td className="py-1 capitalize"> {stateSchool?.elementaryTuition}</td>
                </tr> : 
                null
              }
              {
                stateSchool?.juniorHighSchool ?
                <tr>
                  <td className="py-1">Junior High School</td>
                  <td className="py-1">:</td>
                  <td className="py-1 capitalize"> {stateSchool?.juniorHighSchoolTuition}</td>
                </tr> : 
                null
              }
              {
                stateSchool?.seniorHighSchool ?
                <tr>
                  <td className="py-1">Senior High School</td>
                  <td className="py-1">:</td>
                  <td className="py-1 capitalize"> 
                    {stateSchool?.seniorHighSchoolTuition}

                    {
                      stateSchool?.abm ||
                      stateSchool?.humss ||
                      stateSchool?.stem ||
                      stateSchool?.tvl ?
                        <div className="italic">
                          <h4>Strands:</h4>
                          {stateSchool?.abm ? `ABM` : null}&nbsp;
                          {stateSchool?.humss ? `HUMSS` : null}&nbsp;
                          {stateSchool?.stem ? `STEM` : null}&nbsp;
                          {stateSchool?.tvl ? `TVL` : null}&nbsp;
                        </div> :
                        null
                    }

                  </td>
                </tr> : 
                null
              }
              {
                stateSchool?.modularLearning || stateSchool?.blendedLearning || stateSchool?.onlineLearning ?
                <tr>
                  <td className="py-1">Strategy</td>
                  <td className="py-1">:</td>
                  <td className="capitalize">
                    <ul>
                      {
                        stateSchool?.modularLearning ? <li>Modular Learning</li> : null
                      }
                      {
                        stateSchool?.blendedLearning ? <li>Blended Learning</li> : null
                      }
                      {
                        stateSchool?.onlineLearning ? <li>Online Learning</li> : null
                      }
                    </ul>
                  </td>
                </tr> : 
                null
              }
            </tbody>
          </table>

          <button role="button" onClick={e=>router.back()} className="mt-5 w-full p-3 border bg-gray-100 text-center hover:bg-white trasition duration-150 ease-in-out">Go Back</button>
 

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