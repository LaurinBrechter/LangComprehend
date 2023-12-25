"use server";

import React from 'react'
import { PrismaClient } from '@prisma/client'


const getText = async (videoId: number) => {
  
    const prisma = new PrismaClient()
  
    const data = await prisma.videos.findUnique({
        where: {
            id: videoId
        }
    })

    const videoText = data?.videoText?.toString("utf8")

    return videoText

    return (
    <div>getText</div>
  )
}

export default getText