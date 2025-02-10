// import { prisma } from "@/app/prisma/prisma-client";
import { PrismaClient, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: { blogSlug: string } }) {
    try {
        console.log(params.blogSlug);
        const post = await client.post.findFirst({
            where: {
                url: params.blogSlug,
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