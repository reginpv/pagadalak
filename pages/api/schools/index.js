import db from '../../../config/firebase'
import { collection, onSnapshot } from '@firebase/firestore'

export default async (req, res) => {

    const schools = onSnapshot(collection(db, 'schools'), snapshot => {

      res.status(200).json(snapshot.docs.map(doc=>({
        ...doc.data(), 
        id: doc.id
      })))

    })

}