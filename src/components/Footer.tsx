import Link from "next/link";
import { getSiteSettings } from "@/lib/cms";
import { Send, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default async function Footer() {
    const settings = await getSiteSettings();
    const currentYear = new Date().getFullYear();

    if (!settings) return null;

    return (
        <footer className="bg-secondary pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Contacts */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-black uppercase tracking-widest text-primary block">
                            {settings.siteName || "СВЕТЛЫЙ"}
                        </Link>
                        <div className="space-y-4 text-muted-foreground text-sm">
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-foreground">{settings.phone}</p>
                                    <p>Ежедневно 9:00 - 21:00</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary shrink-0" />
                            <p>г. Новосибирск, село Ленинское, улица Пятая Благодатная, 69</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-primary shrink-0" />
                            <a href={`mailto:${settings.email}`} className="hover:text-primary transition-colors">{settings.email}</a>
                        </div>
                    </div>


                    {/* Navigation */}
                    <div>
                        <h3 className="font-bold mb-6 text-lg">Навигация</h3>
                        <ul className="space-y-4">
                            {settings.footerLinks?.map((link: any, idx: number) => (
                                <li key={idx}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Access or Info */}
                    <div>
                        <h3 className="font-bold mb-6 text-lg">Информация</h3>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="/promotions" className="hover:text-primary transition-colors">Акции</Link></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="font-bold mb-6 text-lg">Мы в соцсетях</h3>
                        <p className="text-muted-foreground mb-6 text-sm">
                            Подписывайтесь на нас, чтобы следить за ходом строительства и акциями.
                        </p>
                        <div className="flex gap-3">
                            {settings.socials?.map((social: any) => (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-background rounded-lg flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-primary-foreground transition-all"
                                >
                                    {social.icon === 'send' && <Send className="w-5 h-5" />}
                                    {social.icon === 'message-circle' && <MessageCircle className="w-5 h-5" />}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8 text-center text-muted-foreground text-sm">
                    <p>&copy; 2026 Светлый. Все права защищены.</p>
                </div>
            </div>
        </footer >
    );
}
