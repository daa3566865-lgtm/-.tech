import Image from 'next/image';
import Link from 'next/link';
import { Ruler, Maximize, Home } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.id}`} className="group block h-full">
            <div className="border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                            No Image
                        </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {project.area} m²
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                            <Maximize className="w-4 h-4" />
                            <span>{project.dimensions}м</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Home className="w-4 h-4" />
                            <span>{project.rooms} комнат</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground">Стоимость домокомплекта</p>
                            <p className="text-xl font-bold text-primary">
                                {new Intl.NumberFormat('ru-RU').format(project.price)} ₽
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
