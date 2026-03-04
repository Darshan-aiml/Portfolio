'use client';

import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// Session-level cache so animations never replay after the first reveal
const animatedSet = new Set<string>();

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters' | 'line';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  /** When true, the animation replays every time the element scrolls into view */
  repeat?: boolean;
}

export default function BlurText({
  text,
  delay = 200,
  animateBy = 'line',
  direction = 'top',
  onAnimationComplete,
  className = '',
  style,
  repeat = false,
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: !repeat, margin: '-50px' });

  // Derive a stable key from the text content
  const cacheKey = text;
  const alreadyAnimated = !repeat && animatedSet.has(cacheKey);

  const [hasFinished, setHasFinished] = useState(alreadyAnimated);
  const [completedCount, setCompletedCount] = useState(0);

  const elements = useMemo(() => {
    if (animateBy === 'line') {
      return [text];
    }
    if (animateBy === 'words') {
      return text.split(' ');
    }
    return text.split('');
  }, [text, animateBy]);

  // Mark animation complete once every element has finished
  const handleElementComplete = useCallback(() => {
    setCompletedCount((c) => c + 1);
  }, []);

  // Reset completed count when element leaves view (for repeat mode)
  useEffect(() => {
    if (repeat && !isInView) {
      setCompletedCount(0);
      setHasFinished(false);
    }
  }, [repeat, isInView]);

  useEffect(() => {
    if (completedCount === elements.length && !hasFinished) {
      setHasFinished(true);
      if (!repeat) animatedSet.add(cacheKey);
      onAnimationComplete?.();
    }
  }, [completedCount, elements.length, hasFinished, cacheKey, onAnimationComplete, repeat]);

  const yOffset = direction === 'top' ? -20 : 20;

  // If already animated this session, render plain text instantly
  if (alreadyAnimated) {
    return (
      <div className={className} style={{ display: 'flex', flexWrap: 'wrap', ...style }}>
        {elements.map((el, i) => (
          <span
            key={i}
            style={{ display: 'inline-block' }}
          >
            {el}
            {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', ...style }}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(12px)', y: yOffset }}
          animate={
            isInView
              ? { opacity: 1, filter: 'blur(0px)', y: 0 }
              : { opacity: 0, filter: 'blur(12px)', y: yOffset }
          }
          transition={{
            duration: 0.5,
            delay: (i * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={handleElementComplete}
          style={{
            display: 'inline-block',
            willChange: 'opacity, filter, transform',
          }}
        >
          {el}
          {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </div>
  );
}
