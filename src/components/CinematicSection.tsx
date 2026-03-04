'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CinematicSectionProps {
    label: string;
    title: string;
    description: string;
    index: number;
}

export default function CinematicSection({
    label,
    title,
    description,
}: CinematicSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end center'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

    return (
        <motion.div
            ref={sectionRef}
            style={{ opacity, y }}
            className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16"
        >
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium mb-3">
                {label}
            </p>
            <h2
                className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-normal leading-[1.15] tracking-tight text-white mb-4"
                style={{ fontFamily: '"Gupter", serif' }}
            >
                {title}
            </h2>
            <p className="text-[0.95rem] md:text-[1.05rem] leading-[1.75] text-white/60 font-light">
                {description}
            </p>
        </motion.div>
    );
}
