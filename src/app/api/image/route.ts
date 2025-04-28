import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const fileName = url.searchParams.get('name');

    if (!fileName) {
        return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Захист від шкідливих шляхів
    const safeFileName = path.basename(fileName);
    const filePath = path.join(process.cwd(), 'public', 'uploads', safeFileName);

    try {
        // Перевіряємо, чи існує файл
        await fs.access(filePath);

        const fileBuffer = await fs.readFile(filePath);
        const ext = path.extname(safeFileName).toLowerCase();

        const mimeTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
        };

        const contentType = mimeTypes[ext] || 'application/octet-stream';

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `inline; filename="${safeFileName}"`,
            },
        });
    } catch (err) {
        console.error('File not found or error:', err);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}
