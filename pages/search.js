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
    if(qs.district!=="" && qs.type=="public") constraints.push(where("district", "==", qs.district))
    if(qs.tuition!=="") {
      if(qs.level!=="") {

        constraints.push(where(`${qs.level}Tuition`, "==", qs.tuition))

      } else {

        constraints.push(where("tuitionRange", "array-contains", qs.tuition))
  
     } 
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

      <div className="px-30px py-3 md:py-30px">
        <FormSearch queryString={qs} className="w-full grid grid-flow-row md:grid-flow-col gap-2 md:gap-5 p-3 bg-gray-100" />
      </div>

      {
        searchResults.length > 0 ?
        <>
          <div className="px-30px py-3 md:py-30px">
            <div className="border-t border-b py-4">Found {searchResults.length} results.</div>
          </div>
        </> :
        null
      }

      <div className="px-30px py-3 md:py-30px grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
        {
          searchResults.length > 0 ?
          searchResults.map(school=>(
            <div key={school.id} className="border p-3 bg-gray-50 flex flex-col justify-between space-y-5">
              <div>
                <h3 className="font-bold mb-3">{school.name}</h3>
                <table>
                  <tbody>
                    <tr>
                      <td className="py-1">Type</td>
                      <td className="py-1">&nbsp;:&nbsp;</td>
                      <td className="capitalize"> {school.type}</td>
                    </tr>
                    {
                      school?.district!=="" && school.type=="public" ?
                      <tr>
                        <td className="py-1">District</td>
                        <td className="py-1">&nbsp;:&nbsp;</td>
                        <td className="capitalize"> {school.district}</td>
                      </tr> : 
                      null
                    }
                    {
                      school?.elementary ?
                      <tr>
                        <td className="py-1">Elementary</td>
                        <td className="py-1">&nbsp;:&nbsp;</td>
                        <td className="capitalize"> {school?.elementaryTuition}</td>
                      </tr> : 
                      null
                    }
                    {
                      school?.juniorHighSchool ?
                      <tr>
                        <td className="py-1">JHS</td>
                        <td className="py-1">&nbsp;:&nbsp;</td>
                        <td className="capitalize"> {school?.juniorHighSchoolTuition}</td>
                      </tr> : 
                      null
                    }
                    {
                      school?.seniorHighSchool ?
                      <tr>
                        <td className="py-1">SHS</td>
                        <td className="py-1">&nbsp;:&nbsp;</td>
                        <td className="capitalize"> {school?.seniorHighSchoolTuition}</td>
                      </tr> : 
                      null
                    }
                    {
                      school?.modularLearning || school?.blendedLearning || school?.onlineLearning ?
                      <tr>
                        <td className="py-1">Strategy</td>
                        <td className="py-1">&nbsp;:&nbsp;</td>
                        <td className="capitalize">
                          <ul>
                            {
                              school?.modularLearning ? <li>Modular Learning</li> : null
                            }
                            {
                              school?.blendedLearning ? <li>Blended Learning</li> : null
                            }
                            {
                              school?.onlineLearning ? <li>Online Learning</li> : null
                            }
                          </ul>
                        </td>
                      </tr> : 
                      null
                    }
                  </tbody>
                </table>
              </div>

              <Link href={`/schools/${school.id}`}>
                <a className="p-3 border bg-gray-100 text-center hover:bg-white trasition duration-150 ease-in-out">View on Map</a>
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

  console.log(query)

  return {
    props: {
      qs: query,
    }
  }
}
