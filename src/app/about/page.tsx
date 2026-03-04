'use client';

import SectionReveal from '@/components/SectionReveal';

const experiences = [
  {
    role: 'Green Internship – Capstone Project Intern',
    company: '1M1B (1 Million for 1 Billion)',
    period: 'Nov 2025 – Jan 2026',
  },
  {
    role: 'Artificial Intelligence and Data Analytics Intern',
    company: 'AICTE & Shell',
    period: 'Sep 2025 – Oct 2025',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Divider line */}
      <div className="max-w-[1304px] mx-auto px-6 md:px-10 pt-28">
        <div className="w-full h-[1px] bg-white/10" />
      </div>

      {/* About section — sticky left, scrolling right */}
      <section className="max-w-[1304px] mx-auto px-6 md:px-10 pt-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: Sticky "About" heading + dot */}
          <div className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start">
            <SectionReveal>
              <h1
                className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-normal leading-[1] tracking-tight text-white"
                style={{ fontFamily: '"Gupter", serif' }}
              >
                About
              </h1>
            </SectionReveal>

            {/* Small dot */}
            <SectionReveal>
              <div className="mt-32 md:mt-48 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-white/80" />
              </div>
            </SectionReveal>
          </div>

          {/* Right: Scrolling description + experience */}
          <div className="lg:w-[60%]">
            {/* Bio paragraphs */}
            <SectionReveal>
              <p
                className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-normal leading-[1.6] tracking-[-0.01em] text-white/90"
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
                className="mt-10 text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-normal leading-[1.6] tracking-[-0.01em] text-white/90"
                style={{ fontFamily: '"Gupter", serif' }}
              >
                My work centers on solving practical problems through scalable backend systems,
                agentic AI workflows, and enterprise-ready applications such as legal document
                intelligence platforms and AI-driven resume analysis tools. I care about moving
                beyond prototypes — building systems that are robust, evaluatable, and
                deployment-ready.
              </p>
            </SectionReveal>

            <SectionReveal>
              <p
                className="mt-10 text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-normal leading-[1.6] tracking-[-0.01em] text-white/90"
                style={{ fontFamily: '"Gupter", serif' }}
              >
                Outside of building AI systems, I explore emerging technologies at the
                intersection of human interaction and machine intelligence.
              </p>
            </SectionReveal>

            {/* Experience section */}
            <div className="mt-24 md:mt-32">
              <div className="w-full h-[1px] bg-white/10 mb-10" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-light mb-12">
                Experience
              </p>

              <div className="space-y-0">
                {experiences.map((exp, i) => (
                  <SectionReveal key={i}>
                    <div className="py-8 border-b border-white/10">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                        <div className="flex-1">
                          <h3
                            className="text-lg md:text-xl font-normal text-white tracking-tight"
                            style={{ fontFamily: '"Gupter", serif' }}
                          >
                            {exp.role}
                          </h3>
                          <p className="text-sm text-accent font-medium mt-1">
                            {exp.company}
                          </p>
                        </div>
                        <p className="text-sm text-white/40 whitespace-nowrap md:pt-1">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>

            {/* Education section */}
            <div className="mt-24 md:mt-32">
              <div className="w-full h-[1px] bg-white/10 mb-10" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-light mb-12">
                Education
              </p>

              <div className="space-y-0">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
