'use client';
import { Lyric } from '@/app/types';
import alienman from '@/songs/alienman.json';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

/**
 * @see SongHeader
 * @see LyricLine
 * @see LyricsContainer
 */
export default function LyricsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const { title, lyrics } = alienman;

  return (
    <div className="pt-32 pb-32 max-w-5xl mx-auto">
      <h1 className="text-center">{title}</h1>
      <div className="w-full h-0.5 bg-indigo-500 mt-2"></div>
      <p className="italic mb-6 text-center pt-2">
        Dotted underlines indicate additional context.
      </p>
      {lyrics.map((line: Lyric, index: number) => (
        <LyricLine key={index} line={line} />
      ))}
    </div>
  );
}

/**
 * Renders a single line of lyrics with optional annotation
 * @param {Object} props
 * @param {Lyric} props.line - The lyric line object containing text and optional annotation
 */
function LyricLine({ line }: { line: Lyric }) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const [songParts, setSongParts] = useState<string[]>([
    'Verse 1',
    'Verse 2',
    'Verse 3',
    'Hook',
  ]);

  return (
    <div
      ref={lineRef}
      className={`text-lg pb-0.5 block ${
        line.annotation
          ? 'cursor-pointer hover:text-white transition-colors duration-200'
          : ''
      }`}
    >
      {songParts.includes(line.text) ? (
        <div className="font-bold py-2.5 text-xl">{line.text}</div>
      ) : line.annotation ? (
        <span className="border-b border-dotted border-white hover:border-white transition-colors duration-200">
          {line.text}
        </span>
      ) : (
        line.text
      )}
    </div>
  );
}
