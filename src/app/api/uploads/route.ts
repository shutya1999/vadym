import { NextRequest, NextResponse } from "next/server";
import { writeFile, readdir } from "fs/promises";
import fs from 'fs/promises';
import path from "path";
import crypto from "crypto";

export async function GET() {
    try {
        const uploadDir = path.join(process.cwd(), "public/uploads/");
        const files = await readdir(uploadDir); // Отримуємо список файлів

        // Формуємо абсолютні URL для файлів
        const fileUrls = files.map(file => `/uploads/${file}`);

        return NextResponse.json({ files: fileUrls, status: 200 });
    } catch (error) {
        console.error("Error retrieving files:", error);
        return NextResponse.json({ message: "Failed to retrieve files", status: 500 });
    }
}



export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("files") as File[]; // Отримуємо всі файли як File[]

        if (!files.length) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), "public/uploads/");
        const existingFiles = await readdir(uploadDir); // Отримуємо всі файли в папці
        const savedFiles: string[] = [];

        for (const file of files) {
            const ext = path.extname(file.name).toLowerCase(); // Отримуємо розширення файлу (.jpg, .png і т.д.)
            let randomName: string;

            // Генеруємо унікальну назву файлу
            do {
                randomName = crypto.randomUUID() + ext;
            } while (existingFiles.includes(randomName)); // Повторюємо генерацію, якщо файл вже існує

            const buffer = Buffer.from(await file.arrayBuffer());
            const filePath = path.join(uploadDir, randomName);

            await writeFile(filePath, buffer);
            savedFiles.push(randomName);
        }

        return NextResponse.json({ message: "Success", files: savedFiles, status: 201 });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ message: "Failed", status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: false, // Вимикаємо стандартний парсер Next.js
    },
};



export async function DELETE(request: NextRequest) {
    try {
        const { filename } = await request.json(); // Отримуємо ім'я файлу з тіла запиту
        
        if (!filename) {
            return NextResponse.json({ message: "Filename is required"}, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'public/uploads', filename);

        // Перевірка чи існує файл
        await fs.access(filePath);

        // Видалення файлу
        await fs.unlink(filePath);

        return NextResponse.json({ message: "Файл видалено"}, { status: 200 });
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ message: "Failed to delete file"}, { status: 500 });
    }
}


