import { getPageContent } from "@/lib/cms";
import PageBlockRenderer from "@/components/PageBlockRenderer";

export const dynamic = 'force-dynamic';

export default async function TechnologiesPage() {
    const page = await getPageContent('technologies');

    if (!page) {
        return <div className="container mx-auto px-4 py-12 text-center">Страница не найдена. Создайте 'technologies' в админке.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center">{page.title}</h1>

            {page.blocks && page.blocks.length > 0 ? (
                <PageBlockRenderer blocks={page.blocks} />
            ) : (
                /* Fallback for legacy HTML content */
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.content }} />
            )}
        </div>
    );
}
