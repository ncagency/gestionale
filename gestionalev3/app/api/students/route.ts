import { getStudents } from "@/app/lib/data";
import { NextResponse } from "next/server";


export const GET = async (req: Request, res: Response) => {
    try {
        const students = await getStudents()
        return NextResponse.json({message: "Studenti recuperati",students},{status:200})
    } catch (err) {
        return NextResponse.json({message: "Error",err},{status:500})
    }
}


export const POST = async (req: Request, res: Response) => {
    console.log("POST REQUEST RICCHIO");
}