
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client';


const client = new PrismaClient()


export async function GET() {
    // SELECT * FROM users WHERE email = 'emasd'
    const users = await client.user.findMany();

    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    const user = await client.user.create({
        data,
    });

    return NextResponse.json(user);
}