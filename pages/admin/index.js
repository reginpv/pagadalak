import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, doc, onSnapshot, deleteDoc } from '@firebase/firestore'
import db from '../../config/firebase'
import Basic from "../../components/templates/basic"


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
      <div className="p-30px">
        <div className="py-3">
          <Link href="/admin/school/add">
            <a className="p-3 border">Add new school</a>
          </Link>
        </div>
        <hr className="my-10" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 my-5">
          {
            stateSchools.map(school=>(
              <div key={school.id} className="border bg-gray-50 grid grid-flow-row">
                <div className="p-3">
                  <h3 className="font-bold">{school.name}</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Type</td>
                        <td>:</td>
                        <td className="capitalize">{school.type}</td>
                      </tr>
                      <tr>
                        <td>District</td>
                        <td>:</td>
                        <td className="capitalize">{school.district}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-2 items-center justify-center text-center">
                  <Link href={`/admin/school/${school.id}`}>
                    <a className="p-3 bg-gray-300">Edit</a>
                  </Link>
                  <button role="button" className="p-3 bg-gray-300 border-l" onClick={()=>deleteDocument(school.id)}>Delete</button>
                </div>
              </div>
            ))
          }  
        </div>
      </div>
    </Basic>
  )
}
