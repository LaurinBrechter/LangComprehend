import Link from "next/link"
import Sidebar from "./Sidebar"
import NavItems from "./NavItems"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const Nav = async () => {

  const session = await getServerSession(authOptions)

  return (
    <header className="bg-gray-600 text-gray-100 h-[10%] flex items-center">
      <nav className="flex w-full px-10 py-4 gap-10 items-center">
        {/* <div  className="flex flex-row gap-10 justify-start"> */}
        {session ? (
          <>
            <Sidebar />
            <NavItems />
            <div className="flex justify-end grow">
              <Link href="/api/auth/signout?callbackUrl=/" className="text-2xl btn">
                Logout
              </Link>
            </div>
            {/* <SearchBar /> */}
          </>
        ) : (
          <>
            <Link href="/" className="text-2xl">LangComprehend</Link>
            <div className="flex justify-end grow">
              <Link href="/api/auth/signin" className="btn text-2xl">Login</Link>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Nav