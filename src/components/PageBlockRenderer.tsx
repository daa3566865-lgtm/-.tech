import Image from "next/image";
import { Check, Zap, ShieldCheck, ThermometerSun, Ruler } from "lucide-react";
import { PageBlock } from "@/types";

export default function PageBlockRenderer({ blocks }: { blocks?: PageBlock[] }) {
    if (!blocks || blocks.length === 0) return null;

    return (
        <div className="space-y-16">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'text_image':
                        return (
                            <section key={block.id} className={`grid md:grid-cols-2 gap-8 items-center ${block.imagePosition === 'right' ? '' : 'md:flex-row-reverse'}`}>
                                <div className={`relative aspect-video bg-muted rounded-xl overflow-hidden ${block.imagePosition === 'right' ? 'md:order-last' : ''}`}>
                                    {block.image ? (
                                        <Image src={block.image} alt={block.title || ''} fill className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">Изображение</div>
                                    )}
                                </div>
                                <div>
                                    {block.title && <h2 className="text-3xl font-bold mb-6">{block.title}</h2>}
                                    <div className="prose max-w-none text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                                </div>
                            </section>
                        );

                    case 'text':
                        return (
                            <section key={block.id} className="max-w-4xl mx-auto text-center">
                                {block.title && <h2 className="text-3xl font-bold mb-6">{block.title}</h2>}
                                <div className="prose max-w-none text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                            </section>
                        );

                    case 'features':
                        return (
                            <section key={block.id} className="bg-secondary/20 p-8 rounded-2xl">
                                {block.title && <h2 className="text-2xl font-bold mb-8 text-center">{block.title}</h2>}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {(block.items || []).map((item, idx) => (
                                        <div key={idx} className="bg-background p-6 rounded-xl shadow-sm">
                                            {/* Icons logic is hard to make dynamic strictly from string, assuming generic 'Check' or relying on HTML in item content if needed, 
                                                but for now let's just render the item text. 
                                                Better: item could be object { title, text, icon? }. 
                                                For simplicity matching current CMS, let's assume item is a HTML string or text. 
                                            */}
                                            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                                                <Check className="w-6 h-6" />
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: item }} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}
