"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, LogOut, Plus, Settings } from "lucide-react";
import { Project, Page } from "@/types";
import AdminProjectCard from "@/components/admin/AdminProjectCard";
import AdminPageEditor from "@/components/admin/AdminPageEditor";
import AdminSettingsEditor from "@/components/admin/AdminSettingsEditor";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'projects' | 'pages' | 'menu' | 'settings'>('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [pages, setPages] = useState<Page[]>([]);
    const [menu, setMenu] = useState<any[]>([]); // Keep specific types if possible
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const router = useRouter();

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const [projectsRes, pagesRes, menuRes, settingsRes] = await Promise.all([
                fetch("/api/projects", { cache: "no-store", headers: { "Pragma": "no-cache" } }),
                fetch("/api/pages", { cache: "no-store", headers: { "Pragma": "no-cache" } }),
                fetch("/api/menu", { cache: "no-store", headers: { "Pragma": "no-cache" } }),
                fetch("/api/settings", { cache: "no-store", headers: { "Pragma": "no-cache" } })
            ]);

            if (projectsRes.status === 401 || pagesRes.status === 401 || menuRes.status === 401) {
                router.push("/login");
                return;
            }

            if (projectsRes.ok) setProjects(await projectsRes.json());
            if (pagesRes.ok) setPages(await pagesRes.json());
            if (menuRes.ok) setMenu(await menuRes.json());
            if (settingsRes.ok) setSettings(await settingsRes.json());

        } catch (error) {
            console.error("Failed to load data", error);
            setStatus({ type: 'error', message: 'Ошибка загрузки данных' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setStatus({ type: null, message: 'Сохранение...' });

        try {
            let endpoint = '';
            let body = {};

            if (activeTab === 'projects') {
                endpoint = '/api/projects';
                body = projects;
            } else if (activeTab === 'pages') {
                endpoint = '/api/pages';
                body = pages;
            } else if (activeTab === 'menu') {
                endpoint = '/api/menu';
                body = menu;
            } else if (activeTab === 'settings') {
                endpoint = '/api/settings';
                body = settings;
            }

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.status === 401) {
                alert("Сессия истекла. Пожалуйста, войдите снова.");
                router.push("/login");
                return;
            }

            if (res.ok) {
                setStatus({ type: 'success', message: 'Изменения успешно сохранены!' });
                setTimeout(() => setStatus({ type: null, message: '' }), 3000);
            } else {
                setStatus({ type: 'error', message: 'Ошибка при сохранении' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Ошибка сети' });
        }
    };

    const handleUpdateProject = (updatedProject: Project) => {
        setProjects(projects.map(p =>
            p.id === updatedProject.id ? updatedProject : p
        ));
    };

    const handleDelete = (id: string) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    const handleAdd = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: "Новый проект",
            price: 0,
            area: 0,
            floors: 1,
            image: "",
            rooms: 1,
            bedrooms: 1,
            bathrooms: 1,
            dimensions: "0 x 0",
            features: [],
            description: "Описание...",
            images: [],
            purchaseOptions: []
        };
        setProjects([...projects, newProject]);
    };

    const handleLogout = () => {
        document.cookie = "admin_session=; Max-Age=0; path=/;";
        router.push("/login");
    };

    // Page handlers
    const handleUpdatePageObject = (index: number, updatedPage: Page) => {
        const newPages = [...pages];
        newPages[index] = updatedPage;
        setPages(newPages);
    };

    // Menu handlers
    const handleUpdateMenu = (index: number, field: string, value: string | number) => {
        const newMenu = [...menu];
        newMenu[index] = { ...newMenu[index], [field]: value };
        setMenu(newMenu);
    };

    const moveMenuItem = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === menu.length - 1) return;

        const newMenu = [...menu];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newMenu[index], newMenu[targetIndex]] = [newMenu[targetIndex], newMenu[index]];

        newMenu.forEach((item, idx) => item.order = idx + 1);
        setMenu(newMenu);
    };

    if (loading) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b gap-4">
                <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <h1 className="text-3xl font-bold mr-4">Админка</h1>
                    <div className="flex bg-muted p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Проекты
                        </button>
                        <button
                            onClick={() => setActiveTab('pages')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'pages' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Страницы
                        </button>
                        <button
                            onClick={() => setActiveTab('menu')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'menu' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Меню
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${activeTab === 'settings' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Settings className="w-4 h-4" /> Настройки
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 items-center w-full md:w-auto justify-end">
                    {status.message && (
                        <div className={`px-4 py-2 rounded text-sm font-medium animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-100 text-green-700' :
                            status.type === 'error' ? 'bg-destructive/10 text-destructive' :
                                'text-muted-foreground'
                            }`}>
                            {status.message}
                        </div>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={status.message === 'Сохранение...'}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50 transition-all active:scale-95"
                    >
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">{status.message === 'Сохранение...' ? 'Сохраняем...' : 'Сохранить'}</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-destructive hover:bg-destructive/10 px-4 py-2 rounded transition-colors"
                        title="Выйти"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {activeTab === 'projects' && (
                    <>
                        {projects.map((project) => (
                            <AdminProjectCard
                                key={project.id}
                                project={project}
                                onChangeProject={handleUpdateProject}
                                onDelete={() => handleDelete(project.id)}
                            />
                        ))}
                        <button
                            onClick={handleAdd}
                            className="w-full py-4 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        >
                            <Plus className="w-5 h-5" /> Добавить новый проект
                        </button>
                    </>
                )}

                {activeTab === 'pages' && (
                    <div className="space-y-8">
                        {pages.map((page, index) => (
                            <div key={page.slug} className="border rounded-lg p-6 bg-card shadow-sm">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pb-4 border-b">
                                    <span className="text-muted-foreground text-sm uppercase tracking-wide">Редактирование:</span>
                                    {page.slug}
                                </h3>
                                <AdminPageEditor page={page} onChange={(updatedPage) => handleUpdatePageObject(index, updatedPage)} />
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted text-muted-foreground border-b uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="p-4">Порядок</th>
                                    <th className="p-4">Название</th>
                                    <th className="p-4">Ссылка</th>
                                    <th className="p-4">Действия</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {menu.sort((a, b) => a.order - b.order).map((item, index) => (
                                    <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-mono text-muted-foreground w-20 text-center">{item.order}</td>
                                        <td className="p-4">
                                            <input
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => handleUpdateMenu(index, 'label', e.target.value)}
                                                className="w-full bg-transparent border-b border-transparent focus:border-primary focus:outline-none transition-colors"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="text"
                                                value={item.href}
                                                onChange={(e) => handleUpdateMenu(index, 'href', e.target.value)}
                                                className="w-full bg-transparent border-b border-transparent focus:border-primary focus:outline-none transition-colors text-blue-600"
                                            />
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            <button
                                                onClick={() => moveMenuItem(index, 'up')}
                                                disabled={index === 0}
                                                className="p-1 hover:bg-muted rounded disabled:opacity-30"
                                                title="Вверх"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                onClick={() => moveMenuItem(index, 'down')}
                                                disabled={index === menu.length - 1}
                                                className="p-1 hover:bg-muted rounded disabled:opacity-30"
                                                title="Вниз"
                                            >
                                                ↓
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-4 bg-muted/20 border-t text-xs text-muted-foreground">
                            * Для сохранения изменения порядка нажмите "Сохранить"
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <AdminSettingsEditor settings={settings} onChange={setSettings} />
                )}
            </div>
        </div>
    );
}
