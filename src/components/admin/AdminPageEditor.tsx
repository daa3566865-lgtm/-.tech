import { Page, PageBlock } from "@/types";
import { Trash, ArrowUp, ArrowDown, Plus, Image as ImageIcon, Type, List } from "lucide-react";

interface AdminPageEditorProps {
    page: Page;
    onChange: (updatedPage: Page) => void;
}

export default function AdminPageEditor({ page, onChange }: AdminPageEditorProps) {

    const updateBlock = (blockId: string, field: string, value: any) => {
        const newBlocks = page.blocks?.map(b =>
            b.id === blockId ? { ...b, [field]: value } : b
        ) || [];
        onChange({ ...page, blocks: newBlocks });
    };

    const handleFeatureItemChange = (blockId: string, itemIndex: number, value: string) => {
        const block = page.blocks?.find(b => b.id === blockId);
        if (!block || !block.items) return;

        const newItems = [...block.items];
        newItems[itemIndex] = value;
        updateBlock(blockId, 'items', newItems);
    };

    const addFeatureItem = (blockId: string) => {
        const block = page.blocks?.find(b => b.id === blockId);
        if (!block) return;
        const newItems = [...(block.items || []), "Новое преимущество"];
        updateBlock(blockId, 'items', newItems);
    };

    const removeFeatureItem = (blockId: string, itemIndex: number) => {
        const block = page.blocks?.find(b => b.id === blockId);
        if (!block || !block.items) return;
        const newItems = block.items.filter((_, i) => i !== itemIndex);
        updateBlock(blockId, 'items', newItems);
    };

    const addBlock = (type: PageBlock['type']) => {
        const newBlock: PageBlock = {
            id: Date.now().toString(),
            type,
            title: 'Новый блок',
            content: '',
            image: '',
            imagePosition: 'right',
            items: []
        };
        onChange({ ...page, blocks: [...(page.blocks || []), newBlock] });
    };

    const removeBlock = (blockId: string) => {
        onChange({ ...page, blocks: page.blocks?.filter(b => b.id !== blockId) || [] });
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        if (!page.blocks) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === page.blocks.length - 1) return;

        const newBlocks = [...page.blocks];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
        onChange({ ...page, blocks: newBlocks });
    };

    // If page has no blocks but has content, maybe warn or show legacy content?
    // We already migrated data in pages.json, so let's assume blocks exist or are empty.

    return (
        <div className="space-y-8">
            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <label className="block text-sm font-medium mb-1">Заголовок страницы (H1)</label>
                <input
                    type="text"
                    value={page.title}
                    onChange={(e) => onChange({ ...page, title: e.target.value })}
                    className="w-full p-2 border rounded text-lg font-bold"
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold">Блоки контента</h3>

                {(!page.blocks || page.blocks.length === 0) && (
                    <div className="p-8 text-center border-2 border-dashed rounded-lg text-muted-foreground">
                        Нет блоков. Добавьте первый блок ниже.
                        {page.content && <p className="text-xs mt-2 text-yellow-600">Внимание: У этой страницы есть старый HTML контент. Добавление блоков скроет его.</p>}
                    </div>
                )}

                {page.blocks?.map((block, index) => (
                    <div key={block.id} className="border rounded-lg bg-card shadow-sm overflow-hidden">
                        <div className="bg-muted px-4 py-2 flex items-center justify-between border-b">
                            <div className="flex items-center gap-2 font-medium text-sm">
                                {block.type === 'text_image' && <ImageIcon className="w-4 h-4" />}
                                {block.type === 'text' && <Type className="w-4 h-4" />}
                                {block.type === 'features' && <List className="w-4 h-4" />}
                                <span className="uppercase text-xs tracking-wider opacity-70">{block.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1 hover:bg-background rounded disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                                <button onClick={() => moveBlock(index, 'down')} disabled={index === (page.blocks?.length || 0) - 1} className="p-1 hover:bg-background rounded disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                                <button onClick={() => removeBlock(block.id)} className="p-1 hover:bg-destructive/10 text-destructive rounded ml-2"><Trash className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Common: Title */}
                            <div>
                                <label className="block text-xs font-medium mb-1 uppercase text-muted-foreground">Заголовок блока</label>
                                <input
                                    type="text"
                                    value={block.title || ''}
                                    onChange={(e) => updateBlock(block.id, 'title', e.target.value)}
                                    className="w-full p-2 border rounded"
                                    placeholder="Необязательно"
                                />
                            </div>

                            {/* Type Specific Fields */}
                            {(block.type === 'text_image' || block.type === 'text') && (
                                <div>
                                    <label className="block text-xs font-medium mb-1 uppercase text-muted-foreground">Текст (HTML)</label>
                                    <textarea
                                        value={block.content || ''}
                                        onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                                        className="w-full p-2 border rounded h-32 font-mono text-sm"
                                    />
                                </div>
                            )}

                            {block.type === 'text_image' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium mb-1 uppercase text-muted-foreground">Ссылка на изображение</label>
                                        <input
                                            type="text"
                                            value={block.image || ''}
                                            onChange={(e) => updateBlock(block.id, 'image', e.target.value)}
                                            className="w-full p-2 border rounded"
                                            placeholder="/path/to/image.jpg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1 uppercase text-muted-foreground">Позиция фото</label>
                                        <select
                                            value={block.imagePosition || 'right'}
                                            onChange={(e) => updateBlock(block.id, 'imagePosition', e.target.value)}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="right">Справа</option>
                                            <option value="left">Слева</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {block.type === 'features' && (
                                <div>
                                    <label className="block text-xs font-medium mb-1 uppercase text-muted-foreground">Список преимуществ</label>
                                    <div className="space-y-2">
                                        {block.items?.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => handleFeatureItemChange(block.id, idx, e.target.value)}
                                                    className="flex-1 p-2 border rounded"
                                                />
                                                <button onClick={() => removeFeatureItem(block.id, idx)} className="p-2 text-destructive hover:bg-destructive/10 rounded"><Trash className="w-4 h-4" /></button>
                                            </div>
                                        ))}
                                        <button onClick={() => addFeatureItem(block.id)} className="text-sm text-primary hover:underline flex items-center gap-1">
                                            <Plus className="w-3 h-3" /> Добавить пункт
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="flex gap-2 justify-center py-4 border-t border-dashed">
                    <button onClick={() => addBlock('text_image')} className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded text-sm transition-colors">
                        <ImageIcon className="w-4 h-4" /> Текст + Фото
                    </button>
                    <button onClick={() => addBlock('features')} className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded text-sm transition-colors">
                        <List className="w-4 h-4" /> Преимущества
                    </button>
                    <button onClick={() => addBlock('text')} className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded text-sm transition-colors">
                        <Type className="w-4 h-4" /> Текст
                    </button>
                </div>
            </div>
        </div>
    );
}
