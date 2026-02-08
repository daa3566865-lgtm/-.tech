import { Project, PurchaseOption } from "@/types";
import { ChevronDown, ChevronRight, Trash2, Plus, ArrowUp, ArrowDown, ImageIcon, Layout, DollarSign, Ruler, FileText, Layers } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import AdminPurchaseOption from "./AdminPurchaseOption";

interface AdminProjectCardProps {
    project: Project;
    onChangeProject: (project: Project) => void;
    onDelete: (id: string) => void;
    // Optional legacy props to avoid build errors if parent passes them (though we ignore them)
    onUpdate?: any;
    onMoveImage?: any;
    onAddOption?: any;
    onUpdateOption?: any;
    onRemoveOption?: any;
}

export default function AdminProjectCard({
    project,
    onChangeProject,
    onDelete,
}: AdminProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<'main' | 'specs' | 'gallery' | 'options'>('main');

    const handleChange = (field: keyof Project, value: any) => {
        onChangeProject({ ...project, [field]: value });
    };

    const mainImage = project.images?.[0] || "";

    const handleMainImageChange = (url: string) => {
        const newImages = [...(project.images || [])];
        if (newImages.length === 0) newImages.push(url);
        else newImages[0] = url;
        handleChange("images", newImages);
    };

    const moveImage = (index: number, direction: number) => {
        const newImages = [...(project.images || [])];
        if (index + direction < 0 || index + direction >= newImages.length) return;

        const temp = newImages[index];
        newImages[index] = newImages[index + direction];
        newImages[index + direction] = temp;
        handleChange("images", newImages);
    };

    // --- Purchase Option Handlers ---

    const handleAddOption = (projectId: string) => {
        // projectId is ignored here since we edit 'project' directly
        const newOption: PurchaseOption = {
            id: Date.now().toString(),
            name: "Новый вариант",
            price: 0,
            term: "30 дней",
            sections: []
        };
        const newOptions = [...(project.purchaseOptions || []), newOption];
        handleChange("purchaseOptions", newOptions);
    };

    const handleUpdateOption = (projectId: string, optionId: string, field: keyof PurchaseOption, value: any) => {
        const newOptions = (project.purchaseOptions || []).map(opt =>
            opt.id === optionId ? { ...opt, [field]: value } : opt
        );
        handleChange("purchaseOptions", newOptions);
    };

    const handleRemoveOption = (projectId: string, optionId: string) => {
        const newOptions = (project.purchaseOptions || []).filter(opt => opt.id !== optionId);
        handleChange("purchaseOptions", newOptions);
    };

    const handleAddSection = (projectId: string, optionId: string) => {
        const newOptions = (project.purchaseOptions || []).map(opt => {
            if (opt.id === optionId) {
                return {
                    ...opt,
                    sections: [...(opt.sections || []), { title: "Новый раздел", items: [] }]
                };
            }
            return opt;
        });
        handleChange("purchaseOptions", newOptions);
    };

    const handleUpdateSection = (projectId: string, optionId: string, sectionIdx: number, title: string, items?: string[]) => {
        // Note: AdminPurchaseOption might pass title as first arg, and items as second?
        // Let's look at the signature we use below: (sIdx, title, items) 
        // Helper function to match what we need
        const newOptions = (project.purchaseOptions || []).map(opt => {
            if (opt.id === optionId) {
                const newSections = [...(opt.sections || [])];
                const currentSection = newSections[sectionIdx];
                newSections[sectionIdx] = {
                    title: title,
                    items: items !== undefined ? items : currentSection.items
                };
                return { ...opt, sections: newSections };
            }
            return opt;
        });
        handleChange("purchaseOptions", newOptions);
    };

    const handleRemoveSection = (projectId: string, optionId: string, sectionIdx: number) => {
        const newOptions = (project.purchaseOptions || []).map(opt => {
            if (opt.id === optionId) {
                const newSections = (opt.sections || []).filter((_, i) => i !== sectionIdx);
                return { ...opt, sections: newSections };
            }
            return opt;
        });
        handleChange("purchaseOptions", newOptions);
    };


    return (
        <div className="border rounded-xl shadow-sm bg-card overflow-hidden transition-all duration-200 hover:shadow-md mb-4 bg-white">
            {/* Minimal Header (Always Visible) */}
            <div
                className="flex items-center justify-between p-4 bg-secondary/10 cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    <button className="text-muted-foreground hover:text-foreground">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>

                    {/* Tiny Thumbnail in Header */}
                    <div className="w-12 h-12 bg-muted rounded-md overflow-hidden relative border flex-shrink-0">
                        {mainImage ? (
                            <img src={mainImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground opacity-50" />
                        )}
                    </div>

                    <div>
                        <h3 className="font-bold text-lg leading-tight">{project.title || "Новый проект"}</h3>
                        <p className="text-sm text-muted-foreground">
                            {project.area} м² • {new Intl.NumberFormat('ru-RU').format(project.price)} ₽
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                        title="Удалить проект"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="border-t animate-in slide-in-from-top-2 duration-200">
                    {/* Navigation Tabs */}
                    <div className="flex border-b bg-muted/30 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('main')}
                            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'main' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        >
                            <Layout className="w-4 h-4" /> Основное
                        </button>
                        <button
                            onClick={() => setActiveTab('specs')}
                            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'specs' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        >
                            <Ruler className="w-4 h-4" /> Характеристики
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'gallery' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        >
                            <ImageIcon className="w-4 h-4" /> Галерея
                        </button>
                        <button
                            onClick={() => setActiveTab('options')}
                            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'options' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        >
                            <DollarSign className="w-4 h-4" /> Комплектации
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Tab: MAIN INFO */}
                        {activeTab === 'main' && (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Название проекта</label>
                                        <input
                                            value={project.title}
                                            onChange={(e) => handleChange("title", e.target.value)}
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Например: Айдахо"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Базовая цена (₽)</label>
                                        <input
                                            type="number"
                                            value={project.price}
                                            onChange={(e) => handleChange("price", parseInt(e.target.value) || 0)}
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Главное изображение (Обложка)</label>
                                    <div className="flex gap-4 items-start p-4 border border-dashed rounded-lg bg-secondary/5">
                                        <div className="w-48 h-32 bg-muted rounded-md overflow-hidden border flex-shrink-0 relative">
                                            {mainImage ? (
                                                <img src={mainImage} alt="Cover" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full text-xs text-muted-foreground">Нет фото</div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <input
                                                value={mainImage}
                                                onChange={(e) => handleMainImageChange(e.target.value)}
                                                className="w-full p-2 border rounded-md text-sm font-mono"
                                                placeholder="Вставьте ссылку на изображение..."
                                            />
                                            <p className="text-xs text-muted-foreground">Это изображение будет показываться в каталоге первым. Мы рекомендуем использовать горизонтальные изображения высокого качества.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Описание</label>
                                    <textarea
                                        value={project.description}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                        className="w-full p-2 border rounded-md min-h-[100px] focus:ring-2 focus:ring-primary/20 outline-none"
                                        placeholder="Краткое описание проекта..."
                                    />
                                </div>
                            </div>
                        )}

                        {/* Tab: SPECS */}
                        {activeTab === 'specs' && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Ruler className="w-3 h-3" /> Площадь (м²)</label>
                                    <input
                                        type="number"
                                        value={project.area}
                                        onChange={(e) => handleChange("area", parseInt(e.target.value) || 0)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Layers className="w-3 h-3" /> Этажей</label>
                                    <input
                                        type="number"
                                        value={project.floors}
                                        onChange={(e) => handleChange("floors", parseInt(e.target.value) || 0)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Комнат</label>
                                    <input
                                        type="number"
                                        value={project.rooms}
                                        onChange={(e) => handleChange("rooms", parseInt(e.target.value) || 0)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Спален</label>
                                    <input
                                        type="number"
                                        value={project.bedrooms}
                                        onChange={(e) => handleChange("bedrooms", parseInt(e.target.value) || 0)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Санузлов</label>
                                    <input
                                        type="number"
                                        value={project.bathrooms}
                                        onChange={(e) => handleChange("bathrooms", parseInt(e.target.value) || 0)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Габариты</label>
                                    <input
                                        value={project.dimensions}
                                        onChange={(e) => handleChange("dimensions", e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                        placeholder="7x9 м"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Tab: GALLERY */}
                        {activeTab === 'gallery' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-sm">Дополнительные фото</h4>
                                    <button
                                        onClick={() => {
                                            const newImages = [...(project.images || [])];
                                            newImages.push("");
                                            handleChange("images", newImages);
                                        }}
                                        className="text-xs flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                                    >
                                        <Plus className="w-3 h-3" /> Добавить фото
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {(project.images || []).map((img, idx) => {
                                        if (idx === 0) return null; // Skip main image (shown in first tab)

                                        return (
                                            <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg bg-background group hover:border-primary/50 transition-colors">
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={() => moveImage(idx, -1)} disabled={idx === 1} className="p-1 text-muted-foreground hover:bg-secondary rounded disabled:opacity-20 transition-colors" title="Move Up">
                                                        <ArrowUp className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => moveImage(idx, 1)} disabled={idx === (project.images?.length || 0) - 1} className="p-1 text-muted-foreground hover:bg-secondary rounded disabled:opacity-20 transition-colors" title="Move Down">
                                                        <ArrowDown className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="w-20 h-14 bg-muted rounded overflow-hidden flex-shrink-0 border relative">
                                                    {img ? (
                                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">Пусто</div>
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    <input
                                                        value={img}
                                                        onChange={(e) => {
                                                            const newImages = [...(project.images || [])];
                                                            newImages[idx] = e.target.value;
                                                            handleChange("images", newImages);
                                                        }}
                                                        className="w-full border rounded px-3 py-2 text-sm font-mono focus:border-primary outline-none"
                                                        placeholder="https://..."
                                                    />
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        const newImages = (project.images || []).filter((_, i) => i !== idx);
                                                        handleChange("images", newImages);
                                                    }}
                                                    className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                                                    title="Remove Image"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        );
                                    })}

                                    {(project.images?.length || 0) <= 1 && (
                                        <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                                            Нет дополнительных изображений. Добавьте больше фото для галереи.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tab: PURCHASE OPTIONS */}
                        {activeTab === 'options' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="space-y-1">
                                        <h4 className="font-semibold text-sm">Варианты комплектации</h4>
                                        <p className="text-xs text-muted-foreground">Например: "Домокомплект", "Теплый контур"</p>
                                    </div>
                                    <button
                                        onClick={() => handleAddOption(project.id)}
                                        className="text-xs flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                                    >
                                        <Plus className="w-3 h-3" /> Добавить вариант
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {(project.purchaseOptions || []).map((option) => (
                                        <AdminPurchaseOption
                                            key={option.id}
                                            option={option}
                                            onUpdate={(field, value) => handleUpdateOption(project.id, option.id, field, value)}
                                            onRemove={() => handleRemoveOption(project.id, option.id)}
                                            onAddSection={() => handleAddSection(project.id, option.id)}
                                            onUpdateSection={(sIdx, t, i) => handleUpdateSection(project.id, option.id, sIdx, t, i)}
                                            onRemoveSection={(sIdx) => handleRemoveSection(project.id, option.id, sIdx)}
                                        />
                                    ))}

                                    {(project.purchaseOptions?.length || 0) === 0 && (
                                        <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg bg-secondary/5">
                                            У этого проекта пока нет вариантов комплектации.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
