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
    const base_class = "text-2xl btn"

    return (
        <div className='bg-gray-600 flex items-center gap-4'>
            {
                paths.map((path) => {
                    return (
                        <div key={path.path}>
                            <Link
                                href={path.path}
                                className={pathname == path.path ? base_class + " btn-md" : base_class + " btn-sm"}
                                key={path.path}>{path.name}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )


}

export default NavItems