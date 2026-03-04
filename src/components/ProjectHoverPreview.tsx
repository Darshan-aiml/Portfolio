'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProjectHoverPreviewProps {
  images: string[];
  activeIndex: number | null;
}

export default function ProjectHoverPreview({
  images,
  activeIndex,
}: ProjectHoverPreviewProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const prevIndexRef = useRef<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Track direction of index change
  useEffect(() => {
    if (activeIndex !== null && prevIndexRef.current !== null) {
      setDirection(activeIndex > prevIndexRef.current ? 1 : -1);
    }
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const animate = useCallback(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.15);
    currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.15);
    setMousePos({ x: currentRef.current.x, y: currentRef.current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    if (activeIndex !== null) {
      // Snap to current mouse position immediately so the preview doesn't lerp from (0,0)
      const snap = (e: MouseEvent) => {
        const pos = { x: e.clientX, y: e.clientY };
        targetRef.current = pos;
        currentRef.current = pos;
        setMousePos(pos);
      };
      window.addEventListener('mousemove', snap, { once: true });
      window.addEventListener('mousemove', handleMouseMove);
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, animate]);

  const slideVariants = {
    enter: { y: '100%', opacity: 0 },
    center: { y: '0%', opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  };

  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: 0,
            top: 0,
            x: mousePos.x - 200,
            y: mousePos.y - 140,
          }}
        >
          {/* Preview window */}
          <div className="relative w-[320px] h-[220px] md:w-[400px] md:h-[280px] rounded-lg overflow-hidden shadow-2xl bg-neutral-900">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeIndex]}
                  alt="Project preview"
                  fill
                  className="object-cover"
                  sizes="400px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* "View" circle overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full bg-accent flex items-center justify-center">
                <span className="text-black text-sm font-medium">View</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
