"use client";

import { useState } from "react";
import { Home, Send, Phone, User, CheckCircle2 } from "lucide-react";

export default function BookingForm() {
    const [formData, setFormData] = useState({
        realtorName: "",
        realtorPhone: "",
        clientName: "",
        clientPhone: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would typically send data to a backend
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isSubmitted) {
        return (
            <div className="bg-card max-w-lg mx-auto p-12 rounded-2xl shadow-xl text-center border">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
                <p className="text-muted-foreground mb-8">
                    Спасибо, {formData.realtorName}. Мы свяжемся с вами в ближайшее время для подтверждения бронирования.
                </p>
                <button
                    onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ realtorName: "", realtorPhone: "", clientName: "", clientPhone: "" });
                    }}
                    className="text-primary font-medium hover:underline"
                >
                    Отправить новую заявку
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* House-themed Header Decoration */}
            <div className="relative mb-[-40px] z-10 flex justify-center">
                <div className="bg-primary p-4 rounded-full shadow-lg border-4 border-background">
                    <Home className="w-8 h-8 text-primary-foreground" />
                </div>
            </div>

            <div className="bg-white dark:bg-card border rounded-2xl shadow-xl overflow-hidden pt-12">
                <div className="px-8 pb-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-3">Заявка на бронирование</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Специальный сервис для партнеров и риелторов. Заполните форму для фиксации клиента.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Realtor Section */}
                        <div className="bg-muted/30 p-6 rounded-xl space-y-4 border border-border/50">
                            <h3 className="font-semibold flex items-center gap-2 text-primary">
                                <User className="w-4 h-4" />
                                Данные специалиста (Риелтора)
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Имя специалиста *</label>
                                    <input
                                        type="text"
                                        name="realtorName"
                                        value={formData.realtorName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Иванов Иван"
                                        className="w-full p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Телефон специалиста *</label>
                                    <input
                                        type="tel"
                                        name="realtorPhone"
                                        value={formData.realtorPhone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+7 (999) 000-00-00"
                                        className="w-full p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Client Section */}
                        <div className="bg-muted/30 p-6 rounded-xl space-y-4 border border-border/50">
                            <h3 className="font-semibold flex items-center gap-2 text-primary">
                                <User className="w-4 h-4" />
                                Данные покупателя (Клиента)
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Имя покупателя *</label>
                                    <input
                                        type="text"
                                        name="clientName"
                                        value={formData.clientName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Петров Петр"
                                        className="w-full p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Телефон покупателя *</label>
                                    <input
                                        type="tel"
                                        name="clientPhone"
                                        value={formData.clientPhone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+7 (999) 000-00-00"
                                        className="w-full p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Отправить заявку
                            </button>
                            <p className="text-center text-xs text-muted-foreground mt-4">
                                Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                            </p>
                        </div>
                    </form>
                </div>
                <div className="h-2 bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
            </div>
        </div>
    );
}
