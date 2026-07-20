"use client";
import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface TextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const WordReveal = ({ text, className, style }: TextProps) => {
  return (
    <motion.h1 
      style={{ ...style }} 
      className={className} 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
    >
      {text}
    </motion.h1>
  );
};

export const LetterBounce = ({ text, className, style }: TextProps) => {
  const words = text.split(' ');
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };
  const child: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 10, stiffness: 200, bounce: 0.6 },
    },
  };

  return (
    <motion.h1 style={{ ...style }} className={className} variants={container} initial="hidden" whileInView="visible" viewport={{ once: false }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {Array.from(word).map((letter, index) => (
            <motion.span variants={child} key={index} style={{ display: 'inline-block' }}>
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};

export const Typewriter = ({ text, className, style }: TextProps) => {
  const words = text.split(' ');
  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  };
  const child: Variants = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline-block', transition: { duration: 0.01 } },
  };

  return (
    <motion.h1 
      className={className} 
      style={{ ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {Array.from(word).map((letter, index) => (
             <motion.span variants={child} key={index}>
               {letter}
             </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};

export const GlitchText = ({ text, className, style }: TextProps) => {
  return (
    <motion.h1
      className={className}
      style={{ display: 'inline-block', ...style }}
      initial={{ skewX: 50, opacity: 0 }}
      whileInView={{ skewX: 0, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.8 }}
    >
      {text}
    </motion.h1>
  );
};

export const ScalePopText = ({ text, className, style }: TextProps) => {
  return (
    <motion.h1
      className={className}
      style={{ display: 'inline-block', ...style }}
      initial={{ scale: 0.3, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7, type: 'spring', bounce: 0.5, stiffness: 100 }}
    >
      {text}
    </motion.h1>
  );
};

export const LettersPullUp = ({ text, className = '', style }: TextProps) => {
  const words = text.split(' ');
  
  const pullupVariant = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  let letterIndex = 0;

  return (
    <motion.div 
      className={`title-main ${className}`}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', ...style }}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          {word.split('').map((letter) => {
            const currentIndex = letterIndex++;
            return (
              <motion.span
                key={currentIndex}
                variants={pullupVariant}
                custom={currentIndex}
                style={{ display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.div>
  );
};
