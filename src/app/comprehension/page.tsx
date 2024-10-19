import React from 'react'
import { getVideoData } from '../../actions/getVideoData';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
        <Link href={"/comprehension/youtube"}><Button>Youtube</Button></Link>
        <Link href={"/comprehension/pdf"}><Button>PDF</Button></Link>
        <Link href={"/comprehension/raw-text"}><Button>Raw Text</Button></Link>
      </div>
    </div>
  )


}

export default Comprehension