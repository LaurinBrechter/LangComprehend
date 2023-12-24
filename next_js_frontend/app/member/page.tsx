import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const Member = async () => {

  const session = await getServerSession(options)

  if (!session) {
    return (
      redirect('/api/auth/signin?callbackUrl=/member')
    )
  } else {
    return (<div>
      <h1>Member Server Session</h1>
      <p>{session?.user.name} you are logged in.</p>
    </div>)
  }
}

export default Member