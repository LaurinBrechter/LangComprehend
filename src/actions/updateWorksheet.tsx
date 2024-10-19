"use server"

import { revalidatePath } from "next/cache"
import prisma from "../components/PrismaClient"

async function updateWorksheet(id: number, formData: FormData) {

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