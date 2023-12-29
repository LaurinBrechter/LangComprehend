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
    <div className="join h-[93%] flex items-center justify-center">
      <Link className="btn join-item" href={"/comprehension/youtube"}>Youtube</Link>
      <Link className="btn join-item" href={"/comprehension/pdf"}>PDF</Link>
      <Link className="btn join-item" href={"/comprehension/raw-text"}>Raw Text</Link>
    </div>
  )


}

export default Comprehension