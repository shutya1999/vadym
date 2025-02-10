import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client';

const client = new PrismaClient()

export async function GET() {
    const posts = await client.post.findMany();

    return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
    const data = await request.json();

    try {
        const post = await client.post.create({ data });

        return NextResponse.json(post);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({ message: "Помилка валідації", details: error.message }, { status: 400 });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return NextResponse.json({ message: "Такий запис вже існує", details: error.meta }, { status: 400 });
            }
        }
        return NextResponse.json({ message: "Внутрішня помилка сервера"});
    }
}

