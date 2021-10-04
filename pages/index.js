import { useContext } from "react"
import Link from 'next/link'
import FormSearch from "../components/formSearch"
import Basic from "../components/templates/basic"
import { GlobalContext } from '../context/GlobalState'

export default function Home() {

  const { searchResults } = useContext(GlobalContext)

  return (
    <Basic>
      <div className="p-30px">
        <FormSearch className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5" />
      </div>

      {
        searchResults.length > 0 ?
        <div className="px-30px">
          <hr className="mt-3 mb-10" />
        </div> :
        null
      }

      <div className="px-30px grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
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
