import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

const dataFilePath = path.join(process.cwd(), 'src/data/menu.json');

// Middleware check helper
async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.has("admin_session");
}

export async function GET() {
    try {
        const fileBuffer = await fs.readFile(dataFilePath);
        const data = JSON.parse(fileBuffer.toString());
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
