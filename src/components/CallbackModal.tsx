"use client";

import { useState } from "react";
import { X, Phone, User, MessageSquare } from "lucide-react";

interface CallbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to backend
        console.log("Form submitted:", { name, phone });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setName("");
            setPhone("");
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-background w-full max-w-md p-6 rounded-2xl shadow-xl relative animate-in zoom-in-95 duration-200 m-4">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {submitted ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Спасибо!</h3>
                        <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-2">Заказать звонок</h2>
                        <p className="text-muted-foreground mb-6">Оставьте свои данные, и мы перезвоним вам в течение 15 минут.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Ваше имя
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Иван Иванов"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Телефон
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <input
                                        type="tel"
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="+7 (999) 000-00-00"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2"
                            >
                                Отправить
                            </button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
