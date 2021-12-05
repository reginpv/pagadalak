import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, doc, onSnapshot, deleteDoc } from '@firebase/firestore'
import db from '../../config/firebase'
import Basic from "../../components/templates/basic"
import _ from 'lodash'


export default function Admin({ schools }) {

  const [ stateSchools, setStateSchools ] = useState([])

  useEffect(()=>{

    const unsub = onSnapshot(collection(db, "schools"), (snapshot)=>{
      setStateSchools(snapshot.docs.map(doc=>{
        return {
          ...doc.data(),
          id: doc.id
        }
      }))
    })

    return unsub

  },[])

  const deleteDocument = async (id) => {
    const docRef = doc(db, "schools", id)
    await deleteDoc(docRef)
  }

  return (
    <Basic
      auth={true}
    >
      <div className="px-30px py-3 md:py-30px">
        <div className="py-3">
          <Link href="/admin/school/add">
            <a className="p-3 border uppercase">Add new school</a>
          </Link>
        </div>

        <hr className="my-10" />

        <p>Found {stateSchools.length} schools in our record.</p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 my-5">
          {
            _.orderBy(stateSchools,['name'],['asc']).map(school=>(
              <div key={school.id} className="border bg-gray-50 flex flex-col justify-between">
                <div className="p-3">
                  <h3 className="font-bold">{school.name}</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Type</td>
                        <td>:</td>
                        <td className="capitalize">{school.type}</td>
                      </tr>
                      {
                        school?.district!=="" && school.type=="public" ?
                        <tr>
                          <td>District</td>
                          <td>:</td>
                          <td className="capitalize">{school.district}</td>
                        </tr> :
                        null
                      }
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-2 items-center justify-center text-center">
                  <Link href={`/admin/school/${school.id}`}>
                    <a className="p-3 bg-gray-300">Edit</a>
                  </Link>
                  <button role="button" className="p-3 bg-gray-300 border-l" onClick={()=>{
                    if(confirm(`Are you sure you want to delete ${school.name}?`)){
                      deleteDocument(school.id)
                    }
                  }}>Delete</button>
                </div>
              </div>
            ))
          }  
        </div>
      </div>
    </Basic>
  )
}
