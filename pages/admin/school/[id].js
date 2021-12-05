import db from '../../../config/firebase'
import { collection, getDocs } from '@firebase/firestore'
import Basic from "../../../components/templates/basic"
import FormSchoolEdit from '../../../components/formSchoolEdit'

export default function SchoolEdit({ schoolId }) {

  return (
    <Basic
      classMain="flex items-center justify-center mb-10"
      auth={true}
    >
      <div className="px-30px py-3 md:py-30px max-w-screen-sm mx-auto w-full">
        <h1 className="mb-5 text-center text-24px font-bold uppercase">Edit school</h1>
        <FormSchoolEdit schoolId={schoolId} className="grid gap-3" />
      </div>
    </Basic>
  )
}

export async function getStaticProps({ params }) {

  const schoolId = params.id

  return {
    props: {
      schoolId
    }
  }

}

export async function getStaticPaths() {

  let paths = []

  const snapshot = await getDocs(collection(db, "schools"))

  // Get the paths we want to pre-render based on posts
  // const paths = snapshot.map((school) => ({
  //   params: { id: school.id },
  // }))

  snapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    
    paths.push({
      params: {
        ...doc.data(),
        id: doc.id
      }
    })

  });

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }

}