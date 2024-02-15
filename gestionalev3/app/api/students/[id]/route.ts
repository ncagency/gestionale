import { getDatas,getById } from "@/app/lib/data";
import { NextResponse } from "next/server";




export async function GET(response: Response, context:any) {
    try {
        const {params} = context
        const students = await getById(params.id, 'students')
        return NextResponse.json({message: "Studenti recuperati",students},{status:200})
    } catch (err) {
        return NextResponse.json({message: "Error",err},{status:500})
    }
}
