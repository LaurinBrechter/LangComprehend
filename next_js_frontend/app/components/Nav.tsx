import Link from "next/link"
import { options } from "../api/auth/[...nextauth]/options.js"
import { getServerSession } from "next-auth"
import Sidebar from "./Sidebar.tsx"

const Nav = async () => {

  const session = await getServerSession(options)

  return (
    <header className="bg-gray-600 text-gray-100 h-[10%] flex items-center">
      <nav className="flex w-full px-10 py-4 gap-10 items-center">
        {/* <div  className="flex flex-row gap-10 justify-start"> */}
          <Sidebar />
          <h1>LangComprehend</h1>
          <Link href="/">Home</Link>
          <Link href="/library">Library</Link>
          {/* <Link href="/CreateUser">Create User</Link> */}
          <Link href="/comprehension">Comprehension</Link>
          {/* <Link href="/ClientMember">Client Member</Link> */}
          <select id="target-language" className="select max-w-xs text-black" defaultValue={"en"}>
            <option value={"fr"}>Fench</option>
            <option value={"en"}>English</option>
            <option value={"de"}>German</option>
            <option value={"es"}>Spanish</option>
          </select>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
      </nav>
    </header>
  )
}

export default Nav