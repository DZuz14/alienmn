'use client';
import { Annotation, Lyric } from '@/app/types';
import AnnotationTooltip from '@/components/AnnotationTooltip';
import Container from '@/components/Container';
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
    <Container>
      <h1 className="text-center">{title}</h1>
      <p className="italic mb-6 text-center pt-2">
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
    </Container>
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
