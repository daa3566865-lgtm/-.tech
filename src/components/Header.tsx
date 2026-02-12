"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, CheckSquare, Settings, Hammer, ChevronDown, Menu } from "lucide-react";
import CallbackModal from "./CallbackModal";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuItems, setMenuItems] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/menu')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setMenuItems(data.sort((a: any, b: any) => a.order - b.order));
                }
            })
            .catch(err => console.error(err));
    }, []);

    // Default menu if API fails or empty
    const displayMenu = menuItems.length > 0 ? menuItems : [
        { id: "projects", label: "Проекты", href: "/", order: 1, type: "dropdown" },
        { id: "promotions", "label": "Акции", "href": "#", "order": 2, "type": "link" },
        { id: "technologies", "label": "Технологии", "href": "/technologies", "order": 3, "type": "link" },
        { id: "portfolio", "label": "Бронирование", "href": "/booking", "order": 4, "type": "link" },
        { id: "contacts", "label": "Контакты", "href": "/contacts", "order": 5, "type": "link" }
    ];

    return (
        <>
            <header className="border-b bg-background sticky top-0 z-50">
                <div className="container mx-auto px-4 h-28 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center transition-opacity hover:opacity-90 shrink-0 h-full">
                        <div className="relative w-[320px] h-full">
                            <Image
                                src="/prosip_logo_new.jpg"
                                alt="PROSIP"
                                fill
                                className="object-contain object-left"
                                priority
                                unoptimized
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center gap-6 text-base font-bold uppercase tracking-wide shrink-0">
                        {displayMenu.map((item) => {
                            if (item.type === 'dropdown' && item.id === 'projects') {
                                return (
                                    <div key={item.id} className="relative group">
                                        <Link href={item.href} className="flex items-center gap-1 hover:text-primary transition-colors py-8">
                                            {item.label} <ChevronDown className="w-5 h-5" />
                                        </Link>
                                        {/* Mega Menu Content - kept hardcoded for now as it's complex layout */}
                                        <div className="absolute top-full left-0 w-[800px] bg-background border rounded-2xl shadow-xl p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all grid grid-cols-3 gap-8 z-50 mt-2">
                                            <Link href="/?category=one-story" className="group/item block relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                                                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover/item:opacity-90 transition-opacity" />
                                                <Image
                                                    src="https://russip.ru/sites/default/files/styles/medium/public/projects/aydaho-1.jpg?itok=XYZ"
                                                    alt="Одноэтажные"
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-48 object-cover transform group-hover/item:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute bottom-0 left-0 p-5 z-20">
                                                    <h3 className="text-white font-bold text-lg mb-1 normal-case">Одноэтажные</h3>
                                                    <p className="text-white/80 text-xs normal-case">Удобство и комфорт</p>
                                                </div>
                                            </Link>

                                            <Link href="/?category=two-story" className="group/item block relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                                                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover/item:opacity-90 transition-opacity" />
                                                <Image
                                                    src="https://russip.ru/sites/default/files/styles/medium/public/projects/optima-1.jpg?itok=ABC"
                                                    alt="Двухэтажные"
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-48 object-cover transform group-hover/item:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute bottom-0 left-0 p-5 z-20">
                                                    <h3 className="text-white font-bold text-lg mb-1 normal-case">Двухэтажные</h3>
                                                    <p className="text-white/80 text-xs normal-case">Для большой семьи</p>
                                                </div>
                                            </Link>

                                            <Link href="/?category=frame" className="group/item block relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                                                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover/item:opacity-90 transition-opacity" />
                                                <Image
                                                    src="https://russip.ru/sites/default/files/styles/medium/public/projects/grand-1.jpg?itok=DEF"
                                                    alt="Каркасные"
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-48 object-cover transform group-hover/item:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute bottom-0 left-0 p-5 z-20">
                                                    <h3 className="text-white font-bold text-lg mb-1 normal-case">Каркасные</h3>
                                                    <p className="text-white/80 text-xs normal-case">Выгодное решение</p>
                                                </div>
                                            </Link>


                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <Link key={item.id} href={item.href} className="hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                );
                            }
                        })}
                    </nav>

                    {/* Contact & CTA */}
                    <div className="hidden lg:flex items-center gap-4 shrink-0">
                        <a href="tel:+79237772655" className="flex items-center gap-2 font-bold text-lg whitespace-nowrap">
                            <Phone className="w-5 h-5 text-primary" />
                            +7 (923) 777-26-55
                        </a>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg"
                        >
                            Заказать звонок
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="xl:hidden p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
