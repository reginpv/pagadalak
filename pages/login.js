import FormLogin from "../components/formLogin";
import FormSearch from "../components/formSearch";
import Basic from "../components/templates/basic";

export default function Login() {
  return (
    <Basic
      classMain="flex items-center justify-center mb-10"
    >
      <div className="p-30px w-full max-w-screen-sm">
        <h1 className="mb-1 text-center text-24px font-bold">Admin Login</h1>
        <p className="mb-5 text-center">For admin use only.</p>
        <FormLogin className="grid gap-5" />
      </div>
    </Basic>
  )
}
