import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Ruler, BedDouble, Bath, Home as HomeIcon, ChevronRight } from "lucide-react";
import { Project } from "@/types";
import projectsData from "@/data/projects.json";
import PurchaseOptionsList from "@/components/PurchaseOptionsList";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    const project = (projectsData as unknown as Project[]).find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Назад в каталог
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">
                {/* Left Column: Images */}
                <div className="space-y-4">
                    <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-muted">
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                Нет изображения
                            </div>
                        )}
                    </div>
                    {/* Thumbnail Gallery (Mock) */}
                    <div className="grid grid-cols-4 gap-4">
                        {[project.image, ...(project.images || [])].slice(0, 4).map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer border hover:border-primary">
                                {img && <Image src={img} alt={`Вид ${idx}`} fill className="object-cover" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div>
                    <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
                    <p className="text-xl text-primary font-bold mb-6">
                        от {new Intl.NumberFormat('ru-RU').format(project.price)} ₽
                    </p>

                    <div className="prose max-w-none text-muted-foreground mb-8">
                        <p>{project.description}</p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-secondary/50 p-4 rounded-lg flex items-center gap-3">
                            <Ruler className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Общая площадь</p>
                                <p className="font-semibold">{project.area} м²</p>
                            </div>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg flex items-center gap-3">
                            <HomeIcon className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Размеры</p>
                                <p className="font-semibold">{project.dimensions}м</p>
                            </div>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg flex items-center gap-3">
                            <BedDouble className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Спальни</p>
                                <p className="font-semibold">{project.bedrooms}</p>
                            </div>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg flex items-center gap-3">
                            <Bath className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Санузлы</p>
                                <p className="font-semibold">{project.bathrooms}</p>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4">Особенности</h3>
                        <ul className="grid grid-cols-2 gap-2">
                            {project.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                    <span className="bg-primary/10 text-primary p-1 rounded-full">
                                        <Check className="w-3 h-3" />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-3">
                        <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                            Рассчитать стоимость строительства
                        </button>
                        <button className="w-full border border-input bg-background hover:bg-secondary py-3 rounded-lg font-medium transition-colors">
                            Скачать PDF презентацию
                        </button>
                    </div>
                </div>
            </div>

            {/* Purchase Options */}
            {project.purchaseOptions && project.purchaseOptions.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Варианты покупки</h2>
                    <PurchaseOptionsList options={project.purchaseOptions} />
                </div>
            )}
        </div>
    );
}

export async function generateStaticParams() {
    return projectsData.map((project) => ({
        id: project.id,
    }));
}
