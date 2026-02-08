import { Trash, Plus } from "lucide-react";

interface AdminSettingsEditorProps {
    settings: any;
    onChange: (newSettings: any) => void;
}

export default function AdminSettingsEditor({ settings, onChange }: AdminSettingsEditorProps) {
    if (!settings) return <div>Загрузка настроек...</div>;

    const handleChange = (field: string, value: any) => {
        onChange({ ...settings, [field]: value });
    };

    const handleSocialChange = (index: number, field: string, value: string) => {
        const newSocials = [...(settings.socials || [])];
        newSocials[index] = { ...newSocials[index], [field]: value };
        handleChange('socials', newSocials);
    };

    const addSocial = () => {
        const newSocials = [...(settings.socials || []), { id: Date.now(), icon: 'send', href: '' }];
        handleChange('socials', newSocials);
    };

    const removeSocial = (index: number) => {
        const newSocials = settings.socials.filter((_: any, i: number) => i !== index);
        handleChange('socials', newSocials);
    };

    const handleLinkChange = (index: number, field: string, value: string) => {
        const newLinks = [...(settings.footerLinks || [])];
        newLinks[index] = { ...newLinks[index], [field]: value };
        handleChange('footerLinks', newLinks);
    };

    const addLink = () => {
        const newLinks = [...(settings.footerLinks || []), { label: 'Ссылка', href: '#' }];
        handleChange('footerLinks', newLinks);
    };

    const removeLink = (index: number) => {
        const newLinks = settings.footerLinks.filter((_: any, i: number) => i !== index);
        handleChange('footerLinks', newLinks);
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Основные настройки</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Название сайта</label>
                        <input
                            type="text"
                            value={settings.siteName || ''}
                            onChange={(e) => handleChange('siteName', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Телефон</label>
                        <input
                            type="text"
                            value={settings.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="text"
                            value={settings.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Адрес</label>
                        <input
                            type="text"
                            value={settings.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Соцсети</h3>
                <div className="space-y-3">
                    {settings.socials?.map((social: any, idx: number) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <select
                                value={social.icon}
                                onChange={(e) => handleSocialChange(idx, 'icon', e.target.value)}
                                className="p-2 border rounded w-32"
                            >
                                <option value="send">Telegram</option>
                                <option value="message-circle">WhatsApp</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Ссылка"
                                value={social.href}
                                onChange={(e) => handleSocialChange(idx, 'href', e.target.value)}
                                className="flex-1 p-2 border rounded"
                            />
                            <button onClick={() => removeSocial(idx)} className="p-2 text-destructive hover:bg-destructive/10 rounded">
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button onClick={addSocial} className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <Plus className="w-4 h-4" /> Добавить соцсеть
                    </button>
                </div>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Ссылки в футере</h3>
                <div className="space-y-3">
                    {settings.footerLinks?.map((link: any, idx: number) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Название"
                                value={link.label}
                                onChange={(e) => handleLinkChange(idx, 'label', e.target.value)}
                                className="w-1/3 p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Ссылка"
                                value={link.href}
                                onChange={(e) => handleLinkChange(idx, 'href', e.target.value)}
                                className="flex-1 p-2 border rounded"
                            />
                            <button onClick={() => removeLink(idx)} className="p-2 text-destructive hover:bg-destructive/10 rounded">
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button onClick={addLink} className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <Plus className="w-4 h-4" /> Добавить ссылку
                    </button>
                </div>
            </div>
        </div>
    );
}
