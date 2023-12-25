import Link from "next/link"
import { options } from "../api/auth/[...nextauth]/options.js"
import { getServerSession } from "next-auth"
import Sidebar from "./Sidebar.tsx"
import SearchBar from "./SearchBar.tsx"
import NavItems from "./NavItems.tsx"

const Nav = async () => {

  const session = await getServerSession(options)

  return (
    <header className="bg-gray-600 text-gray-100 h-[10%] flex items-center">
      <nav className="flex w-full px-10 py-4 gap-10 items-center">
        {/* <div  className="flex flex-row gap-10 justify-start"> */}
          <Sidebar />
          <NavItems/>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
          <SearchBar />
      </nav>
    </header>
  )
}

export default Nav