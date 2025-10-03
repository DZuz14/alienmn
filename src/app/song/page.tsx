'use client';
import { Annotation, Lyric } from '@/app/types';
import alienman from '@/songs/alienman.json';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

/**
 * @see SongHeader
 * @see LyricLine
 * @see AnnotationTooltip
 * @see LyricsContainer
 */
export default function LyricsPage() {
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(
    null
  );
  const pageRef = useRef<HTMLDivElement>(null);

  const { title, lyrics } = alienman;

  /**
   * When a lyric is clicked, display the annotation tooltip.
   * @param annotation - The annotation to display.
   * @param event - The click event.
   */
  const handleLyricClick = (
    annotation: string | undefined,
    event: MouseEvent<HTMLParagraphElement>
  ) => {
    if (!annotation) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    // Position tooltip above the clicked element
    setActiveAnnotation({
      text: annotation,
      position: {
        top: rect.top - 8, // Position above the element with small gap
        left: centerX,
        transform: 'translate(-50%, -100%)', // Center horizontally and position above
      },
      sourceElement: event.currentTarget,
    });
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | any) => {
      if (activeAnnotation) {
        // Don't close if clicking on the tooltip itself
        const target = event.target as Element;
        if (target && target.closest && target.closest('.tooltip')) return;

        // Don't close if clicking on the source element
        if (
          activeAnnotation.sourceElement &&
          activeAnnotation.sourceElement.contains(event.target)
        )
          return;

        setActiveAnnotation(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside as EventListener
      );
    };
  }, [activeAnnotation]);

  return (
    <LyricsContainer
      lyrics={lyrics}
      handleLyricClick={handleLyricClick}
      activeAnnotation={activeAnnotation}
      setActiveAnnotation={setActiveAnnotation}
      title={title}
    />
  );
}

/**
 * Displays the song title header
 * @param {Object} props
 * @param {string} props.title - The title of the song
 */
function SongHeader({ title }: { title: string }) {
  return (
    <h1 className="text-4xl font-bold text-white text-center mt-8 mb-8">
      {title} Lyrics
    </h1>
  );
}

/**
 * Renders a single line of lyrics with optional annotation
 * @param {Object} props
 * @param {Lyric} props.line - The lyric line object containing text and optional annotation
 * @param {Function} props.onAnnotationClick - Handler for when an annotated lyric is clicked
 */
function LyricLine({
  line,
  onAnnotationClick,
}: {
  line: Lyric;
  onAnnotationClick: (
    annotation: string | undefined,
    event: MouseEvent<HTMLParagraphElement>
  ) => void;
}) {
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
      onClick={(e) =>
        onAnnotationClick(line.annotation ? line.annotation : undefined, e)
      }
      className={`text-lg text-white tracking-wide pb-0.5 block ${
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

/**
 * Displays an annotation tooltip at the specified position
 * @param {Object} props
 * @param {Annotation} props.annotation - The annotation object with text and position
 * @param {Function} props.onClose - Handler for closing the annotation
 */
function AnnotationTooltip({
  annotation,
  onClose,
}: {
  annotation: Annotation;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed bg-gray-800/90 backdrop-blur-sm text-white p-4 rounded-lg text-base max-w-sm shadow-lg transition-opacity duration-200 tooltip z-50"
      style={{
        top: annotation.position.top,
        left: annotation.position.left,
        transform: annotation.position.transform,
      }}
      onClick={(e) => {
        e.stopPropagation();
        // Don't close on click - let user click outside to close
      }}
    >
      {annotation.text}
      <div className="absolute left-1/2 bottom-0 w-2 h-2 bg-gray-800/90 transform rotate-45 translate-y-1/2 -translate-x-1/2"></div>
    </div>
  );
}

/**
 * Container component for displaying lyrics with annotations
 * @param {Object} props
 * @param {Array<Lyric>} props.lyrics - The lyrics data
 * @param {Function} props.handleLyricClick - Handler for when a lyric is clicked
 * @param {Annotation | null} props.activeAnnotation - Currently active annotation
 * @param {Function} props.setActiveAnnotation - Function to update the active annotation
 */
function LyricsContainer({
  lyrics,
  handleLyricClick,
  activeAnnotation,
  setActiveAnnotation,
  title,
}: {
  lyrics: Lyric[];
  handleLyricClick: (
    annotation: string | undefined,
    event: MouseEvent<HTMLParagraphElement>
  ) => void;
  activeAnnotation: Annotation | null;
  setActiveAnnotation: (annotation: Annotation | null) => void;
  title: string;
}) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 relative shadow-lg border border-white/20">
      <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
      <p className="text-white italic text-base mb-6 text-center pt-2">
        Dotted underlines indicate additional context.
      </p>
      {lyrics.map((line: Lyric, index: number) => (
        <LyricLine
          key={index}
          line={line}
          onAnnotationClick={handleLyricClick}
        />
      ))}

      {activeAnnotation && (
        <AnnotationTooltip
          annotation={activeAnnotation}
          onClose={() => setActiveAnnotation(null)}
        />
      )}
    </div>
  );
}
