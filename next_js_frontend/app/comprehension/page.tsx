import React from 'react'
import { getVideoData } from '../actions/getVideoData';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Comprehension = async () => {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }


  return (
    <div className="join h-[93%] flex items-center justify-center flex-col">
      <div className='text-3xl font-bold' >Create New Worksheet</div>
      <div>1. Choose a Source</div>
      <div className='join'>
        <Link className="btn join-item" href={"/comprehension/youtube"}>Youtube</Link>
        <Link className="btn join-item" href={"/comprehension/pdf"}>PDF</Link>
        <Link className="btn join-item" href={"/comprehension/raw-text"}>Raw Text</Link>
      </div>
    </div>
  )


}

export default Comprehension