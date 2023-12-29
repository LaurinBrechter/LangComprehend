"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

async function updateWorksheet(id: number, formData: FormData) {

    const prisma = new PrismaClient()
    const visibility = formData.get('ws-visibility') as string

    if (visibility == "public") {
        var vis = true
    } else {
        var vis = false
    }

    await prisma.worksheets.update({
        where: {
            id: id
        },
        data: {
            name: formData.get('ws-name') as string,
            visibility: vis
        }
    })

    revalidatePath("/library/" + id)
}

export default updateWorksheet