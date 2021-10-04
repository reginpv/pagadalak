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
        <div className="grid grid-cols-6 gap-10 my-5">
          {
            stateSchools.map(school=>(
              <div key={school.id}>
                {school.name}
                <p>
                  <Link href={`/admin/school/${school.id}`}>
                    <a>Edit</a>
                  </Link>
                   ---
                  <button role="button" onClick={()=>deleteDocument(school.id)}>Delete</button>
                </p>
              </div>
            ))
          }  
        </div>
      </div>
    </Basic>
  )
}
