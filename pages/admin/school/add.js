import Basic from "../../../components/templates/basic"
import FormSchoolAdd from '../../../components/formSchoolAdd'

export default function SchoolAdd() {

  return (
    <Basic
      classMain="flex items-center justify-center mb-10"
      auth={true}
    >
      <div className="px-30px py-3 md:py-30px max-w-screen-sm mx-auto w-full">
        <h1 className="mb-5 text-center text-24px font-bold uppercase">Add school</h1>
        <FormSchoolAdd className="grid gap-3" />
      </div>
    </Basic>
  )
}