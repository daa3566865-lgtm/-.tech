"use client";

import { useState, useEffect } from "react";
import { FilterState } from "@/types";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

interface FilterPanelProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    minMaxValues: {
        area: [number, number];
        price: [number, number];
        rooms: [number, number];
    };
}

export default function FilterPanel({ filters, onFilterChange, minMaxValues }: FilterPanelProps) {
    // Local state for inputs to avoid too many re-renders/prop updates while typing (optional optimization, keeping it simple for now)

    const handleChange = (key: keyof FilterState, value: any) => {
        onFilterChange({
            ...filters,
            [key]: value,
        });
    };

    const handleRangeChange = (key: 'area' | 'price' | 'rooms', index: 0 | 1, value: string) => {
        const numValue = value === '' ? NaN : parseInt(value);
        const currentRange = filters[key] as [number, number];
        const newRange = [...currentRange] as [number, number];
        newRange[index] = numValue;
        handleChange(key, newRange);
    };

    return (
        <div className="bg-card border rounded-xl p-6 shadow-sm h-fit sticky top-[130px] max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-lg">Фильтры</h2>
                </div>
                <button
                    onClick={() => onFilterChange({
                        area: minMaxValues.area,
                        price: minMaxValues.price,
                        floors: 'all',
                        rooms: minMaxValues.rooms,
                        bedrooms: [0, 10]
                    })}
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                >
                    <RotateCcw className="w-3 h-3" /> Сбросить
                </button>
            </div>

            <div className="space-y-6">
                {/* Area Filter */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Площадь (м²)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={minMaxValues.area[0]}
                            max={filters.area[1]}
                            value={isNaN(filters.area[0]) ? '' : filters.area[0]}
                            onChange={(e) => handleRangeChange('area', 0, e.target.value)}
                            onFocus={(e) => e.target.select()}
                            className="w-full p-2 border rounded-md text-sm bg-background"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                            type="number"
                            min={filters.area[0]}
                            max={minMaxValues.area[1]}
                            value={isNaN(filters.area[1]) ? '' : filters.area[1]}
                            onChange={(e) => handleRangeChange('area', 1, e.target.value)}
                            onFocus={(e) => e.target.select()}
                            className="w-full p-2 border rounded-md text-sm bg-background"
                        />
                    </div>
                </div>

                {/* Price Filter */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Цена (₽)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={minMaxValues.price[0]}
                            max={filters.price[1]}
                            value={isNaN(filters.price[0]) ? '' : filters.price[0]}
                            onChange={(e) => handleRangeChange('price', 0, e.target.value)}
                            onFocus={(e) => e.target.select()}
                            className="w-full p-2 border rounded-md text-sm bg-background"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                            type="number"
                            min={filters.price[0]}
                            max={minMaxValues.price[1]}
                            value={isNaN(filters.price[1]) ? '' : filters.price[1]}
                            onChange={(e) => handleRangeChange('price', 1, e.target.value)}
                            onFocus={(e) => e.target.select()}
                            className="w-full p-2 border rounded-md text-sm bg-background"
                        />
                    </div>
                </div>

                {/* Floors Filter */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Этажность</label>
                    <select
                        value={filters.floors}
                        onChange={(e) => handleChange('floors', e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="w-full p-2 border rounded-md text-sm bg-background"
                    >
                        <option value="all">Любая</option>
                        <option value="1">1 этаж</option>
                        <option value="2">2 этажа</option>
                        <option value="3">3 этажа</option>
                    </select>
                </div>

                {/* Rooms Filter */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Комнат</label>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full">
                            <input
                                type="number"
                                min={minMaxValues.rooms[0]}
                                max={filters.rooms[1]}
                                value={isNaN(filters.rooms[0]) ? '' : filters.rooms[0]}
                                onChange={(e) => handleRangeChange('rooms', 0, e.target.value)}
                                onFocus={(e) => e.target.select()}
                                className="w-full p-2 border rounded-md text-sm bg-background pl-8"
                            />
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">от</div>
                        </div>
                        <span className="text-muted-foreground">-</span>
                        <div className="relative w-full">
                            <input
                                type="number"
                                min={filters.rooms[0]}
                                max={minMaxValues.rooms[1]}
                                value={isNaN(filters.rooms[1]) ? '' : filters.rooms[1]}
                                onChange={(e) => handleRangeChange('rooms', 1, e.target.value)}
                                onFocus={(e) => e.target.select()}
                                className="w-full p-2 border rounded-md text-sm bg-background pl-8"
                            />
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">до</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
