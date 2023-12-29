"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const NavItems = () => {

    const pathname = usePathname()

    const paths = [
        {
            name: "LangComprehend",
            path: "/"
        },
        {
            name: "Library",
            path: "/library"
        },
        {
            name: "Comprehension",
            path: "/comprehension"
        },
        {
            name: "Chat",
            path: "/chat"
        }
    ]
    const base_class = "text-2xl hover:text-gray-300"

    return (
        <div className='bg-gray-600 flex gap-6'>
            {
                paths.map((path) => {
                    return (
                        <Link
                            href={path.path}
                            className={pathname == path.path ? "text-black " + base_class : "text-white " + base_class}
                            key={path.path}>{path.name}
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default NavItems