"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Session } from "next-auth";

export const Nav = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  const paths = [
    {
      name: "Library",
      path: "/library",
    },
    {
      name: "Chat",
      path: "/chat",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Options",
      path: "/options",
    },
  ];
  return (
    <nav>
      <ul className="flex space-x-4 items-center">
        {paths.map((path) => {
          return (
            <li key={path.name}>
              <Link
                href={path.path}
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                {path.name}
              </Link>
            </li>
          );
        })}
        {session ? (
          <li>
            <Button variant="outline">
              <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            </Button>
          </li>
        ) : (
          <li>
            <Button variant="outline">
              <Link href="/api/auth/signin">Login</Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};
