import FormSearch from "../components/formSearch";
import Basic from "../components/templates/basic";

export default function Home() {
  return (
    <Basic>
      <div className="p-30px">
        <FormSearch className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5" />
      </div>
    </Basic>
  )
}
