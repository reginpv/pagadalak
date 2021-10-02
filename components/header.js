import Link from 'next/link'

export default function Header(){
  return(
    <header className="p-30px flex justify-between items-center">
      <div className="font-bold text-40px text-gray-700 uppercase">
        Logo
      </div>
      <div className="">
        <ul>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}