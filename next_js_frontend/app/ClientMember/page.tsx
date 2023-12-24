"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Member = () => {
  
  const {data: session} = useSession({required:true, onUnauthenticated() {
    redirect('/api/auth/signin?callbackUrl=/ClientMember')
  }})

  return (
    <div><h1>Member Client Session</h1></div>
  )
}

export default Member