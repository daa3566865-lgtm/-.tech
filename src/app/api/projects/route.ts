import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "src/data/projects.json");

// Middleware check helper
async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.has("admin_session");
}

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const fileContents = await fs.readFile(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const newProjectData = await req.json();

        // Validation: Ensure it's an array or handle single updates (for simplicity, we'll accept the full array replacement for now, or a single item update if we want to get fancy. Let's do full array replacement for simplest "save all" logic, or single item update. 
        // Actually, let's support updating a single project or adding one.
        // BUT the user wants to "change prices".
        // Simplest approach: The dashboard sends the FULL updated list of projects.

        // Write back to file
        await fs.writeFile(dataFilePath, JSON.stringify(newProjectData, null, 2), "utf8");

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
}
