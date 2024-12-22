'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";
import { UserSettingsSchema } from "@/app/options/page";




export async function updateSettings(settings: z.infer<typeof UserSettingsSchema>) {
    'use server'

    await new Promise(resolve => setTimeout(resolve, 3));
    
    // throw new Error('test')

    console.log(settings)

}