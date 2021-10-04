import FormSearch from "../components/formSearch"
import Basic from "../components/templates/basic"

export default function Home() {

  return (
    <Basic>
      <div className="px-30px py-3 md:py-30px">
        <FormSearch className="w-full grid grid-flow-row md:grid-flow-col gap-2 md:gap-5 p-3 bg-gray-100" />
      </div>
    </Basic>
  )
}
