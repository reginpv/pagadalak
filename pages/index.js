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
        <FormSearch className="w-full grid grid-flow-row md:grid-flow-col gap-2 md:gap-5 p-3 bg-gray-100" />
      </div>
    </Basic>
  )
}
