"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { PurchaseOption } from "@/types";

export default function PurchaseOptionsList({ options }: { options: PurchaseOption[] }) {
    // We can use native details/summary for simple accordion, or controlled state
    // Let's use controlled state to allow "one open at a time" if desired, or just independent toggles.
    // Native details is robust.

    return (
        <div className="space-y-4">
            {options.map((opt) => (
                <details key={opt.id} className="group border rounded-xl overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-700 text-white p-6 cursor-pointer hover:bg-zinc-600 transition-colors">
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold">{opt.name}</h3>
                            <ChevronRight className="w-6 h-6 transition-transform group-open:rotate-90" />
                        </div>
                        <div className="flex gap-8">
                            <div className="text-right">
                                <p className="text-sm opacity-80">Стоимость</p>
                                <p className="text-2xl font-bold">{new Intl.NumberFormat('ru-RU').format(opt.price)} руб.</p>
                            </div>
                            <div className="text-right border-l pl-6 border-white/20">
                                <p className="text-sm opacity-80">Срок строительства</p>
                                <p className="text-xl font-semibold">{opt.term}</p>
                            </div>
                        </div>
                    </summary>

                    <div className="bg-zinc-50 p-6 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {(opt.sections || []).map((section, sIdx) => (
                                <div key={sIdx}>
                                    <h4 className="text-primary font-bold uppercase mb-4 text-sm border-b-2 border-primary/20 pb-2">{section.title}</h4>
                                    <ul className="space-y-3">
                                        {(section.items || []).map((item, iIdx) => (
                                            <li key={iIdx} className="text-sm text-balance leading-relaxed">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </details>
            ))}
        </div>
    );
}
