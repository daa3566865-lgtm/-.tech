"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin");
        } else {
            setError("Неверный пароль");
        }
    };

    return (
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
            <div className="w-full max-w-md p-8 bg-card border rounded-lg shadow-sm">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">Вход в кабинет</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Введите пароль"
                        />
                    </div>

                    {error && <p className="text-destructive text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-2 rounded font-medium hover:bg-primary/90 transition-colors"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}
