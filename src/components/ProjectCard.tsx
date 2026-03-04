'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
    project: Project;
    index: number;
}

const categoryColors: Record<string, string> = {
    Personal: 'bg-accent/10 text-accent border-accent/20',
    Internship: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Hackathon: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            <Link href={`/projects/${project.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-500">
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                            <h3
                                className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-300"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {project.title}
                            </h3>
                            <motion.div
                                className="mt-1 text-text-tertiary group-hover:text-accent transition-colors duration-300"
                                whileHover={{ x: 3 }}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </motion.div>
                        </div>

                        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                            {project.tagline}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-1">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-text-tertiary bg-surface-elevated px-2.5 py-1 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                            {project.tags.length > 3 && (
                                <span className="text-xs text-text-tertiary px-2.5 py-1">
                                    +{project.tags.length - 3}
                                </span>
                            )}
                        </div>

                        {/* Action Links */}
                        {project.links && (
                            <div className="flex gap-2 pt-2">
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary border border-border hover:border-accent/40 hover:text-accent rounded-md transition-all duration-300"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        GitHub
                                    </a>
                                )}
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black bg-accent hover:bg-accent-hover rounded-md transition-all duration-300"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                        Live
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
