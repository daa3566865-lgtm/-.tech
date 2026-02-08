"use client";

import { useState } from "react";
import { Trash2, Plus, ChevronRight, ChevronDown } from "lucide-react";
import { PurchaseOption } from "@/types";
import AdminSection from "./AdminSection";

interface OptionProps {
    option: PurchaseOption;
    onUpdate: (field: keyof PurchaseOption, value: any) => void;
    onRemove: () => void;
    onAddSection: () => void;
    onUpdateSection: (idx: number, title: string, items: string[]) => void;
    onRemoveSection: (idx: number) => void;
}

export default function AdminPurchaseOption({
    option,
    onUpdate,
    onRemove,
    onAddSection,
    onUpdateSection,
    onRemoveSection
}: OptionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border p-4 rounded bg-secondary/10 relative">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <button className="p-1 hover:bg-secondary rounded">
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <h3 className="font-bold text-lg">{option.name || "Новый вариант"}</h3>
                </div>
                <button
                    onClick={onRemove}
                    className="text-destructive hover:bg-destructive/10 p-1 rounded"
                    title="Удалить вариант"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {isOpen && (
                <>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="text-xs font-semibold">Название</label>
                            <input
                                value={option.name}
                                onChange={(e) => onUpdate("name", e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold">Цена (₽)</label>
                            <input
                                type="number"
                                value={option.price}
                                onChange={(e) => onUpdate("price", parseInt(e.target.value) || 0)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold">Срок</label>
                            <input
                                value={option.term}
                                onChange={(e) => onUpdate("term", e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                    </div>

                    {/* Sections & Items */}
                    <div className="space-y-4">
                        {(option.sections || []).map((section, secIdx) => (
                            <AdminSection
                                key={secIdx}
                                title={section.title}
                                items={section.items}
                                onUpdate={(title, items) => onUpdateSection(secIdx, title, items)}
                                onRemove={() => onRemoveSection(secIdx)}
                            />
                        ))}
                        <button
                            onClick={onAddSection}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 mt-2"
                        >
                            <Plus className="w-3 h-3" /> Добавить раздел
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
