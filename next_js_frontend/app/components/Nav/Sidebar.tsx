import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const Sidebar = async () => {

  const prisma = new PrismaClient()

  const all_ws = await prisma.worksheets.findMany({
    select: {
      id: true,
      name: true
    },
    where: {
      NOT: {
        name: null
      }
    }
  })

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn drawer-button bg-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex">
            <h1>Your Worksheets</h1>
            {all_ws.map((ws) => (
              <li key={ws.id}><Link href={`/library/${ws.id}`}>{ws.name}</Link></li>
            ))}
            <Link href="/comprehension" className='btn mt-10'>New Worksheet</Link>
            <Link href="/chat" className='btn'>Surprise Me</Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar