import { getDatas } from "@/app/lib/data";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const students = await getDatas('students')
        return NextResponse.json({message: "Studenti recuperati",students},{status:200})
    } catch (err) {
        return NextResponse.json({message: "Error",err},{status:500})
    }
}


export const POST = async () => {
    console.log("POST REQUEST RICCHIO");
}