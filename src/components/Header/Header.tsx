import Link from "next/link";
import Sidebar from "./Sidebar";
import { Nav } from "./Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            LinguaLearn
          </Link>
          <Nav session={session} />
          {session ? (
            <Sidebar />
          ) : null}
        </div>
      </div>
    </header>
  );
};
