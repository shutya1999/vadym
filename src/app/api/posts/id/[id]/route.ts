// import { prisma } from "@/app/prisma/prisma-client";
import { PrismaClient, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        

        const post = await client.post.findFirst({
            where: {
                id: Number(id)
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


// export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse>

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    try {
        const { id } = await params;
        
        // const id = Number(params.id);
        const body = await req.json(); // Отримуємо дані з тіла запиту

        // Перевіряємо, чи існує пост із цим ID
        const existingPost = await client.post.findUnique({
            where: { id: Number(id) },
        });

        if (!existingPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Оновлення поста з отриманими даними
        const updatedPost = await client.post.update({
            where: { id: Number(id) },
            data: {
                title: body.title || existingPost.title,
                content: body.content || existingPost.content,
                url: body.url || existingPost.url,
                published: body.published !== undefined ? body.published : existingPost.published,
            },
        });

        return NextResponse.json(updatedPost, { status: 200 });

    } catch (error: unknown) {
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



export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();
        // const id = Number(params.id);

        await client.post.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json('Статтю видалено', { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Не влалося видалити статтю' }, { status: 500 });
    }
}