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
                        ? 'bg-white/[0.04] backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                        : 'bg-transparent'
                }`}
            >
                <nav className="w-full max-w-[1470px] mx-auto px-6 md:px-10 h-[50px] flex items-center justify-between">
                    {/* Left: Logo */}
                    <Link
                        href="/"
                        className="font-normal text-white hover:text-white/80 transition-colors duration-300 text-[20px] leading-[29px]"
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
                                            ? 'text-white'
                                            : 'text-white/50 hover:text-white'
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
                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 hover:bg-white/5"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Download CV
                        </a>
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
                                className="block h-[1.5px] w-full bg-white origin-center"
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                className="block h-[1.5px] w-full bg-white"
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="block h-[1.5px] w-full bg-white origin-center"
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
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
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
                                                : 'text-white hover:text-accent'
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
                                    className="flex items-center gap-2 px-6 py-3 text-lg font-medium text-white border border-white/20 rounded-full transition-all duration-300"
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
