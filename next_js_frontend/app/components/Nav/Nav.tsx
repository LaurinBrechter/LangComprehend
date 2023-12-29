import Link from "next/link"
import Sidebar from "./Sidebar.tsx"
// import SearchBar from "./SearchBar.tsx"
import SearchBar from "./SearchBar.tsx"
import NavItems from "./NavItems.tsx"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts"

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
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            <SearchBar />
          </>
        ) : (
          <>
            <Link href="/">LangComprehend</Link>
            <Link href="/api/auth/signin">Login</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Nav