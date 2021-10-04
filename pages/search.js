import { useContext, useEffect } from "react"
import Link from 'next/link'
import FormSearch from "../components/formSearch"
import Basic from "../components/templates/basic"
import { GlobalContext } from '../context/GlobalState'
import { collection, query, where, getDocs } from '@firebase/firestore'
import db from '../config/firebase'

export default function Search({ qs }) {

  const { searchResults, editSearchResults } = useContext(GlobalContext)

  useEffect(async()=>{
    
    let results = []
    let constraints = []
  
    if(qs.type!=="") constraints.push(where("type", "==", qs.type))
    if(qs.level!=="") constraints.push(where(qs.level, "==", true))
    if(qs.strategy!=="") constraints.push(where(qs.strategy, "==", true))
    if(qs.tuition!=="") {
  
      if(qs.level=="elementary") constraints.push(where("elementaryTuition", "==", qs.tuition))
  
      if(qs.level=="juniorHighchool") constraints.push(where("juniorHighSchoolTuition", "==", qs.tuition))
  
      if(qs.level=="seniorHighSchool") constraints.push(where("seniorHighSchoolTuition", "==", qs.tuition))
  
    }
  
    const schoolsRef = collection(db, "schools")
  
    const q = query(schoolsRef, ...constraints)
  
    const querySnapshot = await getDocs(q)
  
    querySnapshot.forEach((doc) => {
  
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data());
  
      results.push({
        ...doc.data(),
        id: doc.id
      })
      
    })

    editSearchResults(results)

  }, [qs])

  return (
    <Basic>

      <div className="p-30px">
        <FormSearch query={query} className="w-full grid grid-flow-row md:grid-flow-col gap-2 md:gap-5 p-3 bg-gray-100" />
      </div>

      {
        searchResults.length > 0 ?
        <div className="px-30px">
          <hr className="mt-3 mb-10" />
        </div> :
        null
      }

      <div className="px-30px grid sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
        {
          searchResults.length > 0 ?
          searchResults.map(school=>(
            <div key={school.id} className="border p-3 bg-gray-50">
              <h3 className="font-bold">{school.name}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Type</td>
                    <td>:</td>
                    <td className="capitalize">{school.type}</td>
                  </tr>
                </tbody>
              </table>
              <Link href={`/schools/${school.id}`}>
                <a>View on Map</a>
              </Link>
            </div>
          )) :
          null
        }
      </div>
    </Basic>
  )
}

export async function getServerSideProps({ query }) {

  return {
    props: {
      qs: query,
    }
  }
}
