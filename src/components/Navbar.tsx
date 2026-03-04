'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrolled } from '@/lib/hooks';

const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const scrolled = useScrolled(20);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#hero');
    const [isDark, setIsDark] = useState(false);

    // Init theme from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            setIsDark(true);
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        if (next) {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    };

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Track which section is in view
    useEffect(() => {
        const sections = ['hero', 'projects', 'about'];
        const observers: IntersectionObserver[] = [];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${id}`);
                    }
                },
                { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            if (pathname !== '/') {
                router.push('/' + href);
                return;
            }
            const id = href.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        },
        [pathname, router]
    );

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? isDark
                            ? 'bg-white/[0.04] backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                            : 'bg-black/[0.03] backdrop-blur-2xl border-b border-black/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
                        : 'bg-transparent'
                }`}
            >
                <nav className="w-full max-w-[1470px] mx-auto px-6 md:px-10 h-[50px] flex items-center justify-between">
                    {/* Left: Logo */}
                    <Link
                        href="/"
                        className="font-normal text-text-primary hover:text-text-secondary transition-colors duration-300 text-[20px] leading-[29px]"
                        style={{ fontFamily: '"Playfair Display SC", serif', letterSpacing: '0.12em' }}
                    >
                        DARSHAN R
                    </Link>

                    {/* Right: Nav Links + Download CV */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href;
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`relative text-sm font-medium transition-colors duration-300 cursor-pointer ${
                                        isActive
                                            ? 'text-text-primary'
                                            : 'text-text-tertiary hover:text-text-primary'
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}

                        <a
                            href="/images/projects/DarshanR_Resume.pdf"
                            download="DarshanR_Resume.pdf"
                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-text-primary border border-border hover:border-text-tertiary rounded-full transition-all duration-300 hover:bg-text-primary/5"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Download CV
                        </a>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:border-text-tertiary transition-all duration-300 hover:bg-text-primary/5"
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait">
                                {isDark ? (
                                    <motion.svg
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-4 h-4 text-text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <circle cx="12" cy="12" r="4" />
                                        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-4 h-4 text-text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col gap-1.5">
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="block h-[1.5px] w-full bg-text-primary origin-center"
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                className="block h-[1.5px] w-full bg-text-primary"
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="block h-[1.5px] w-full bg-text-primary origin-center"
                            />
                        </div>
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            handleNavClick(e, item.href);
                                            setMobileOpen(false);
                                        }}
                                        className={`text-3xl font-normal tracking-wide transition-colors duration-300 cursor-pointer ${
                                            activeSection === item.href
                                                ? 'text-accent'
                                                : 'text-text-primary hover:text-accent'
                                        }`}
                                        style={{ fontFamily: '"Italiana", serif' }}
                                    >
                                        {item.label}
                                    </a>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <a
                                    href="/images/projects/DarshanR_Resume.pdf"
                                    download="DarshanR_Resume.pdf"
                                    className="flex items-center gap-2 px-6 py-3 text-lg font-medium text-text-primary border border-border rounded-full transition-all duration-300"
                                >
                                    Download CV
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
