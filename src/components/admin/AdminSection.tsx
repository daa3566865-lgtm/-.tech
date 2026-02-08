"use client";

import { useState } from "react";
import { Trash2, Plus, ChevronRight, ChevronDown } from "lucide-react";

interface SectionProps {
    title: string;
    items: string[];
    onUpdate: (title: string, items: string[]) => void;
    onRemove: () => void;
}

export default function AdminSection({ title, items, onUpdate, onRemove }: SectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleTitleChange = (newTitle: string) => {
        onUpdate(newTitle, items);
    };

    const handleItemChange = (idx: number, newVal: string) => {
        const newItems = [...items];
        newItems[idx] = newVal;
        onUpdate(title, newItems);
    };

    const handleAddItem = () => {
        onUpdate(title, [...items, ""]);
    };

    const handleRemoveItem = (idx: number) => {
        const newItems = items.filter((_, i) => i !== idx);
        onUpdate(title, newItems);
    };

    return (
        <div className="border border-dashed p-3 rounded bg-background">
            <div className="flex gap-2 mb-2 items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-secondary rounded">
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <input
                    value={title}
                    placeholder="Заголовок раздела (напр. Фундамент)"
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="flex-1 font-bold border rounded px-2 py-1 text-sm bg-transparent"
                />
                <button
                    onClick={onRemove}
                    className="text-destructive hover:bg-destructive/10 p-1 rounded"
                    title="Удалить раздел"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {isOpen && (
                <div className="pl-8 space-y-2 border-l-2 ml-3">
                    {items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-2">
                            <textarea
                                value={item}
                                onChange={(e) => handleItemChange(itemIdx, e.target.value)}
                                className="w-full border rounded px-2 py-1 text-xs min-h-[2rem]"
                                placeholder="Описание пункта"
                            />
                            <button
                                onClick={() => handleRemoveItem(itemIdx)}
                                className="text-destructive hover:bg-destructive/10 p-1 rounded self-start"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddItem}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                        <Plus className="w-3 h-3" /> Добавить пункт
                    </button>
                </div>
            )}
        </div>
    );
}
