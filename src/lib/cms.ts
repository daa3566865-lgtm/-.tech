import { promises as fs } from 'fs';
import path from 'path';
import { Page } from '@/types';

const dataFilePath = path.join(process.cwd(), 'src/data/pages.json');
const settingsFilePath = path.join(process.cwd(), 'src/data/settings.json');

export async function getPageContent(slug: string): Promise<Page | null> {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const pages: Page[] = JSON.parse(fileContents);
        return pages.find(p => p.slug === slug) || null;
    } catch (error) {
        console.error(`Error reading page ${slug}:`, error);
        return null;
    }
}

export async function getSiteSettings() {
    try {
        const fileContents = await fs.readFile(settingsFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading settings:', error);
        return null;
    }
}
