import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

const dataFilePath = path.join(process.cwd(), 'src/data/settings.json');

// Middleware check helper
async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.has("admin_session");
}

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        // Basic validation could go here
        await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
