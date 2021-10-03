//
// Components
//
import Basic from "../../components/templates/basic"

export default function Admin() {

  return (
    <Basic
      auth={true}
    >
      <div className="p-30px">
        Welcome to admin
      </div>
    </Basic>
  )
}