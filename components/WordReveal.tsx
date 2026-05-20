"use client";

interface WordRevealProps {
  text: string;
  className?: string;
}

/** Semantic word spans for screen readers; animation runs on parent .scene-headline */
export default function WordReveal({ text, className = "" }: WordRevealProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
