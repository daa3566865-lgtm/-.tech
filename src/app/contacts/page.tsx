import { getPageContent } from "@/lib/cms";
import PageBlockRenderer from "@/components/PageBlockRenderer";

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
    const page = await getPageContent('contacts');

    if (!page) {
        return <div className="container mx-auto px-4 py-12 text-center">Страница не найдена.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center">{page.title}</h1>
            {page.blocks && page.blocks.length > 0 ? (
                <PageBlockRenderer blocks={page.blocks} />
            ) : (
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.content }} />
            )}
        </div>
    );
}
