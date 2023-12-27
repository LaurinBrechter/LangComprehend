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
    ]

    return (
        <div className='bg-gray-600 flex gap-6'>
            {
                paths.map((path) => {
                    return (
                        <Link href={path.path} className={pathname == path.path ? "text-black" : "text-white"} key={path.path}>{path.name}</Link>
                    )
                })
            }
            {/* <Link href="/" className={pathname=="/" ? "text-black" : "text-white"}>LangComprehend</Link>
        <Link href="/library">Library</Link>
        <Link href="/comprehension">Comprehension</Link> */}
        </div>
    )
}

export default NavItems