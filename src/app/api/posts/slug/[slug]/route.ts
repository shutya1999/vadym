// import { prisma } from "@/app/prisma/prisma-client";
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl.pathname.split('/').pop();

        const post = await client.post.findFirst({
            where: {
                url: url,
                published: true
            },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post item not found' }, { status: 200 });
        }


        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Server erro' }, { status: 500 });
    }
}