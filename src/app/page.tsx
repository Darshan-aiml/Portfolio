'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';
import BlurText from '@/components/BlurText';
import Magnet from '@/components/Magnet';
import ProjectHoverPreview from '@/components/ProjectHoverPreview';
import { projects } from '@/lib/data';

const projectImages = [
  '/images/projects/AI resume Analyser.png',
  '/images/projects/legal sense ai.png',
  '/images/projects/startup.png',
  '/images/projects/hackathon.png',
];

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Subtle geometric diamond */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 45 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] border border-white/[0.06] rounded-sm"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1304px] mx-auto px-6 pt-16 text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[1.5rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem] font-normal leading-[1.15] tracking-tight text-white"
            style={{ fontFamily: '"Gupter", serif' }}
          >
            I design intelligent products built for <span className="text-accent">impact</span>,
            {' '}and Engineered to{' '}
            <span className="text-accent">scale</span>.
          </motion.h1>

          {/* Location subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 text-[11px] md:text-xs tracking-[0.3em] uppercase text-white/40 font-light"
          >
            Based in Bangalore, India
          </motion.p>
        </div>
      </section>

      {/* ===== STATEMENT + ABOUT REVEAL ===== */}
      <section className="bg-black pt-32 md:pt-44 pb-12 md:pb-16 px-6 md:px-10">
        <div className="max-w-[1470px] mx-auto pl-6 md:pl-16 lg:pl-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
            {/* Left: Big statement */}
            <div className="lg:w-[62%]">
              <BlurText
                text="I turn ideas into scalable products."
                animateBy="line"
                direction="top"
                delay={0}
                repeat
                className="text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-normal leading-[1.3] tracking-[-0.01em] text-white block whitespace-nowrap"
                style={{ fontFamily: '"Gupter", serif' }}
              />
              <BlurText
                text="Through structured thinking and clean execution,"
                animateBy="line"
                direction="top"
                delay={80}
                repeat
                className="text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-normal leading-[1.3] tracking-[-0.01em] text-white block whitespace-nowrap"
                style={{ fontFamily: '"Gupter", serif' }}
              />
              <BlurText
                text="built for lasting impact."
                animateBy="line"
                direction="top"
                delay={160}
                repeat
                className="text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-normal leading-[1.3] tracking-[-0.01em] text-white block whitespace-nowrap"
                style={{ fontFamily: '"Gupter", serif' }}
              />
            </div>

            {/* Right: Description + About circle */}
            <div className="lg:w-[38%] flex flex-col items-start gap-12 lg:pt-1">
              <SectionReveal>
                <p className="text-[15px] md:text-[17px] leading-[1.75] text-white/50 max-w-[320px] text-left font-light">
                  The combination of my curiosity for artificial intelligence, hands-on coding, and continuous learning places me at a unique intersection where I build intelligent systems that solve real-world problems.
                </p>
              </SectionReveal>

              <SectionReveal>
                <Magnet padding={80} disabled={false} magnetStrength={3}>
                  <a
                    href="#about"
                    onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="group relative w-[130px] h-[130px] md:w-[160px] md:h-[160px] rounded-full bg-white flex items-center justify-center"
                  >
                    <span className="text-black text-sm font-medium tracking-wide">
                      About me
                    </span>
                  </a>
                </Magnet>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RECENT WORK ===== */}
      <section id="projects" className="bg-black pt-8 pb-32 px-6 md:px-10">
        <div className="max-w-[1304px] mx-auto">
          {/* Label */}
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-light mb-8">
            Recent Work
          </p>
          <div className="w-full h-[1px] bg-white/10" />

          {/* Project rows */}
          {projects.slice(0, 4).map((project, index) => (
            <SectionReveal key={project.id}>
              <Link
                href={`/projects/${project.id}`}
                className={`group block py-12 md:py-16 transition-colors duration-300 ${
                  index < projects.slice(0, 4).length - 1
                    ? 'border-b border-white/10 hover:border-white/30'
                    : ''
                }`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex items-center justify-between gap-8">
                  <h3 className="text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.5rem] font-normal leading-[1.1] tracking-[-0.02em] text-white/90 group-hover:text-white/50 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="hidden sm:block text-sm md:text-[15px] text-white/40 whitespace-nowrap">
                    {project.id === 'rag-resume-analyzer' && 'AI Systems & Backend Development'}
                    {project.id === 'legal-sense-ai' && 'Enterprise AI & LLM Engineering'}
                    {project.id === 'ai-startup-idea-validator' && 'Agentic AI & Multi-Agent Systems'}
                    {project.id === 'customer-churn-prediction' && 'Machine Learning & Deployment'}
                  </p>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {/* Floating hover preview */}
        <ProjectHoverPreview images={projectImages} activeIndex={hoveredProject} />
      </section>

      {/* ===== ABOUT INLINE ===== */}
      <section id="about" className="bg-black px-6 md:px-10">
        <div className="max-w-[1304px] mx-auto">
          {/* Two-column: sticky About + scrolling content */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 pt-16 pb-32">
            {/* Left: Sticky heading + half line */}
            <div className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start">
              <div className="w-3/4 h-[1px] bg-white/20 mb-10" />
              <SectionReveal>
                <h2
                  className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-normal leading-[1] tracking-tight text-white"
                  style={{ fontFamily: '"Gupter", serif' }}
                >
                  About
                </h2>
              </SectionReveal>
            </div>

            {/* Right: scrolling description */}
            <div className="lg:w-[60%]">
              <SectionReveal>
                <p
                  className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-normal leading-[1.6] tracking-[-0.01em] text-white"
                  style={{ fontFamily: '"Gupter", serif' }}
                >
                  I&apos;m Darshan R, an AI &amp; Machine Learning student focused on building
                  production-grade intelligent systems. I design and develop end-to-end AI
                  products — from retrieval-augmented generation pipelines and fine-tuned LLM
                  systems to deployed machine learning models with clean architecture and MLOps
                  practices.
                </p>
              </SectionReveal>

              <SectionReveal>
                <p
                  className="mt-10 text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-normal leading-[1.6] tracking-[-0.01em] text-white"
                  style={{ fontFamily: '"Gupter", serif' }}
                >
                  My work centers on solving practical problems through scalable backend
                  systems, agentic AI workflows, and enterprise-ready applications. I care
                  about moving beyond prototypes — building systems that are robust,
                  evaluatable, and deployment-ready.
                </p>
              </SectionReveal>

              <SectionReveal>
                <p
                  className="mt-10 text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-normal leading-[1.6] tracking-[-0.01em] text-white"
                  style={{ fontFamily: '"Gupter", serif' }}
                >
                  Outside of building AI systems, I explore emerging technologies at the
                  intersection of human interaction and machine intelligence.
                </p>
              </SectionReveal>

              {/* Experience */}
              <div className="mt-24 md:mt-32">
                <div className="w-full h-[1px] bg-white/10 mb-10" />
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-light mb-12">
                  Experience
                </p>

                <SectionReveal>
                  <div className="py-8 border-b border-white/10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                      <div className="flex-1">
                        <h3
                          className="text-lg md:text-xl font-normal text-white tracking-tight"
                          style={{ fontFamily: '"Gupter", serif' }}
                        >
                          Green Internship – Capstone Project Intern
                        </h3>
                        <p className="text-sm text-accent font-medium mt-1">
                          1M1B (1 Million for 1 Billion)
                        </p>
                      </div>
                      <p className="text-sm text-white/40 whitespace-nowrap md:pt-1">
                        Nov 2025 – Jan 2026
                      </p>
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal>
                  <div className="py-8 border-b border-white/10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                      <div className="flex-1">
                        <h3
                          className="text-lg md:text-xl font-normal text-white tracking-tight"
                          style={{ fontFamily: '"Gupter", serif' }}
                        >
                          Artificial Intelligence and Data Analytics Intern
                        </h3>
                        <p className="text-sm text-accent font-medium mt-1">
                          AICTE &amp; Shell
                        </p>
                      </div>
                      <p className="text-sm text-white/40 whitespace-nowrap md:pt-1">
                        Sep 2025 – Oct 2025
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* Education */}
              <div className="mt-24 md:mt-32">
                <div className="w-full h-[1px] bg-white/10 mb-10" />
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-light mb-12">
                  Education
                </p>

                <SectionReveal>
                  <div className="py-8 border-b border-white/10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                      <div className="flex-1">
                        <h3
                          className="text-lg md:text-xl font-normal text-white tracking-tight"
                          style={{ fontFamily: '"Gupter", serif' }}
                        >
                          B.E. Artificial Intelligence &amp; Machine Learning
                        </h3>
                        <p className="text-sm text-accent font-medium mt-1">
                          Sri Sairam College of Engineering, Bengaluru
                        </p>
                        <p className="text-sm text-white/50 mt-1">
                          CGPA: 9.03 (5 semesters)
                        </p>
                      </div>
                      <p className="text-sm text-white/40 whitespace-nowrap md:pt-1">
                        2023 – 2027
                      </p>
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal>
                  <div className="py-8 border-b border-white/10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                      <div className="flex-1">
                        <h3
                          className="text-lg md:text-xl font-normal text-white tracking-tight"
                          style={{ fontFamily: '"Gupter", serif' }}
                        >
                          12th Standard
                        </h3>
                        <p className="text-sm text-accent font-medium mt-1">
                          Sri Gurukulam Senior Secondary School, Hosur
                        </p>
                        <p className="text-sm text-white/50 mt-1">
                          Percentage: 87%
                        </p>
                      </div>
                      <p className="text-sm text-white/40 whitespace-nowrap md:pt-1">
                        2022 – 2023
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* Engineering Capabilities */}
              <div className="mt-24 md:mt-32">
                <div className="w-full h-[1px] bg-white/10 mb-10" />
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-light mb-12">
                  Engineering Capabilities
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <SectionReveal>
                    <div>
                      <h3
                        className="text-lg md:text-xl font-normal text-white tracking-tight"
                        style={{ fontFamily: '"Gupter", serif' }}
                      >
                        AI Systems &amp; Generative AI
                      </h3>
                      <p className="text-sm text-white/70 leading-[1.7] mt-3 font-light">
                        Designed and deployed Retrieval-Augmented Generation (RAG) systems, integrated Large Language Models (LLMs), implemented embeddings and vector search, and orchestrated workflows using LangChain and AI SDKs.
                      </p>
                    </div>
                  </SectionReveal>

                  <SectionReveal>
                    <div>
                      <h3
                        className="text-lg md:text-xl font-normal text-white tracking-tight"
                        style={{ fontFamily: '"Gupter", serif' }}
                      >
                        Machine Learning Engineering
                      </h3>
                      <p className="text-sm text-white/70 leading-[1.7] mt-3 font-light">
                        Built end-to-end ML pipelines including data preprocessing, feature engineering, model training, evaluation, and production-ready model serving.
                      </p>
                    </div>
                  </SectionReveal>

                  <SectionReveal>
                    <div>
                      <h3
                        className="text-lg md:text-xl font-normal text-white tracking-tight"
                        style={{ fontFamily: '"Gupter", serif' }}
                      >
                        Backend &amp; API Development
                      </h3>
                      <p className="text-sm text-white/70 leading-[1.7] mt-3 font-light">
                        Developed scalable backend systems using FastAPI and Flask, designed RESTful APIs, and deployed AI models as production services.
                      </p>
                    </div>
                  </SectionReveal>

                  <SectionReveal>
                    <div>
                      <h3
                        className="text-lg md:text-xl font-normal text-white tracking-tight"
                        style={{ fontFamily: '"Gupter", serif' }}
                      >
                        Full-Stack AI Applications
                      </h3>
                      <p className="text-sm text-white/70 leading-[1.7] mt-3 font-light">
                        Integrated AI systems into web products using React and Next.js, connecting frontend interfaces with intelligent backend services.
                      </p>
                    </div>
                  </SectionReveal>

                  <SectionReveal>
                    <div>
                      <h3
                        className="text-lg md:text-xl font-normal text-white tracking-tight"
                        style={{ fontFamily: '"Gupter", serif' }}
                      >
                        Data &amp; Infrastructure
                      </h3>
                      <p className="text-sm text-white/70 leading-[1.7] mt-3 font-light">
                        Worked with PostgreSQL and vector databases to support structured and semantic data retrieval.
                      </p>
                    </div>
                  </SectionReveal>

                  <SectionReveal>
                    <div>
                      <h3
                        className="text-lg md:text-xl font-normal text-white tracking-tight"
                        style={{ fontFamily: '"Gupter", serif' }}
                      >
                        Automation &amp; Systems Design
                      </h3>
                      <p className="text-sm text-white/70 leading-[1.7] mt-3 font-light">
                        Developed multi-agent AI systems (CrewAI), automated workflows using n8n, and built real-time computer vision applications.
                      </p>
                    </div>
                  </SectionReveal>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
