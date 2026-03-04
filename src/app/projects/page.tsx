'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/data';

const categories = ['All', 'Personal', 'Internship', 'Hackathon'] as const;

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState<string>('All');

    const filteredProjects =
        activeFilter === 'All'
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    return (
        <div className="pt-32 pb-section">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <SectionReveal className="mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                        Portfolio
                    </p>
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Projects
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                        A curated collection of work spanning AI/ML, full-stack development, and UX design —
                        each solving real problems with thoughtful engineering.
                    </p>
                </SectionReveal>

                {/* Filter */}
                <SectionReveal delay={0.2} className="mb-12">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeFilter === cat
                                        ? 'bg-accent text-white'
                                        : 'text-text-secondary bg-surface border border-border hover:border-accent/30 hover:text-text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </SectionReveal>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-text-secondary">No projects found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
