'use client';

import { use, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import CinematicSection from '@/components/CinematicSection';
import SectionReveal from '@/components/SectionReveal';
import { projects } from '@/lib/data';

const categoryLabels: Record<string, string> = {
    Personal: 'PERSONAL',
    Internship: 'SHIPPED',
    Hackathon: 'HACKATHON',
};

interface ProjectDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { id } = use(params);
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    const currentIndex = projects.findIndex((p) => p.id === id);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    /* Hero scroll-disappear */
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
    const heroY = useTransform(heroProgress, [0, 0.7], [0, -60]);

    /* Cinematic narrative sections */
    const cinematicSections = [
        {
            label: '01 — The Challenge',
            title: 'Problem',
            description: project.sections.problem,
        },
        {
            label: '02 — Discovery & Insights',
            title: 'Research',
            description: project.sections.research,
        },
        {
            label: '03 — What Was Built',
            title: 'Solution',
            description: project.sections.solution,
        },
        {
            label: '04 — Results & Learning',
            title: 'Impact',
            description: project.sections.impact,
        },
    ];

    return (
        <div>
            {/* ===== HERO: scroll-disappear ===== */}
            <motion.section
                ref={heroRef}
                style={{ opacity: heroOpacity, y: heroY }}
                className="relative bg-black pt-28 md:pt-36 pb-24 md:pb-32 px-6 md:px-10"
            >
                <div className="max-w-[1400px] mx-auto">
                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-14"
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300 group"
                        >
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back to Projects
                        </Link>
                    </motion.div>

                    {/* Two-column hero */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">
                        {/* Left: badge + title */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:max-w-[50%]"
                        >
                            <h1
                                className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-normal leading-[1.05] tracking-tight text-white"
                                style={{ fontFamily: '"Gupter", serif' }}
                            >
                                {project.title}
                            </h1>
                        </motion.div>

                        {/* Right: divider + tagline + links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:max-w-[45%] lg:pb-2 flex gap-6 items-start"
                        >
                            {/* Green vertical divider */}
                            <div className="hidden lg:block w-[3px] min-h-[60px] self-stretch bg-accent rounded-full flex-shrink-0" />

                            <div>
                            <p
                                className="text-[1.15rem] md:text-[1.35rem] font-normal leading-[1.5] text-white/70"
                                style={{ fontFamily: '"Gupter", serif' }}
                            >
                                {project.tagline}
                            </p>

                            {project.links && (
                                <div className="flex gap-3 mt-8">
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-lg transition-all duration-300"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            Source Code
                                        </a>
                                    )}
                                    {project.links.live && (
                                        <a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-accent hover:bg-accent-hover rounded-lg transition-all duration-300"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                            </svg>
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ===== SINGLE HERO IMAGE ===== */}
            <section className="relative w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                >
                    <div className="relative w-full aspect-[16/8] md:aspect-[16/7]">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ===== CINEMATIC SECTIONS ===== */}
            {cinematicSections.map((section, i) => (
                <CinematicSection
                    key={section.title}
                    label={section.label}
                    title={section.title}
                    description={section.description}
                    index={i}
                />
            ))}

            {/* ===== TECH STACK ===== */}
            <section className="bg-black py-24 md:py-32 px-6 md:px-10">
                <div className="max-w-[1400px] mx-auto">
                    <SectionReveal>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium mb-8">
                            Technologies
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 text-sm text-white/80 bg-white/5 border border-white/10 rounded-lg"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </SectionReveal>
                </div>
            </section>

            {/* ===== NEXT PROJECT ===== */}
            {nextProject && (
                <section className="bg-black px-6 md:px-10 pb-32">
                    <div className="max-w-[1400px] mx-auto">
                        <SectionReveal>
                            <div className="border-t border-white/10 pt-16">
                                <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium mb-6">
                                    Next Project
                                </p>
                                <Link
                                    href={`/projects/${nextProject.id}`}
                                    className="group inline-flex items-center gap-6"
                                >
                                    <h3
                                        className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-normal leading-[1.1] tracking-tight text-white group-hover:text-white/60 transition-colors duration-500"
                                        style={{ fontFamily: '"Gupter", serif' }}
                                    >
                                        {nextProject.title}
                                    </h3>
                                    <svg className="w-8 h-8 text-white/30 group-hover:text-accent transition-all duration-500 group-hover:translate-x-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </SectionReveal>
                    </div>
                </section>
            )}
        </div>
    );
}
