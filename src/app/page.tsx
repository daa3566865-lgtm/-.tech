"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import projectsData from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import FilterPanel from "@/components/FilterPanel";
import { Project, FilterState } from "@/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [filters, setFilters] = useState<FilterState>({
    area: [0, 500],
    price: [0, 10000000],
    floors: 'all',
    rooms: [0, 20],
    bedrooms: [0, 10],
  });

  useEffect(() => {
    if (category === 'one-story') {
      setFilters(prev => ({ ...prev, floors: 1 }));
    } else if (category === 'two-story') {
      setFilters(prev => ({ ...prev, floors: 2 }));
    } else {
      setFilters(prev => ({ ...prev, floors: 'all' }));
    }
  }, [category]);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project: any) => {
      // Area filter
      if (project.area < filters.area[0] || project.area > filters.area[1]) return false;

      // Price filter
      if (project.price < filters.price[0] || project.price > filters.price[1]) return false;

      // Floors filter
      if (filters.floors !== 'all' && project.floors !== filters.floors) return false;

      // Rooms filter
      if (project.rooms < filters.rooms[0] || project.rooms > filters.rooms[1]) return false;

      return true;
    });
  }, [filters]);

  const minMaxValues = {
    area: [0, 500] as [number, number],
    price: [0, 15000000] as [number, number],
    rooms: [0, 20] as [number, number],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Наши Проекты</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 shrink-0">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            minMaxValues={minMaxValues}
          />
        </aside>

        {/* Grid */}
        <div className="flex-1">

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project: any) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">Проектов не найдено.</p>
              <button
                onClick={() => setFilters({
                  area: [0, 500],
                  price: [0, 10000000],
                  floors: 'all',
                  rooms: [0, 20],
                  bedrooms: [0, 10],
                })}
                className="mt-4 text-primary underline"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomeContent />
    </Suspense>
  );
}
