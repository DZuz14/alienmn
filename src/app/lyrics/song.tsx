'use client';
import { useState, MouseEvent } from 'react';

interface Lyric {
  text: string;
  hasAnnotation: boolean;
  annotation?: string;
}

interface Annotation {
  text: string;
  position: {
    top: number;
    left: number;
    transform: string;
  };
}

export default function Lyrics() {
  const [viewMode, setViewMode] = useState<'original' | 'diy'>('original');
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(
    null
  );

  const lyrics: { [key: string]: Lyric[] } = {
    original: [
      {
        text: 'Started from the bottom, now we here',
        hasAnnotation: true,
        annotation:
          'References the journey from underground to mainstream success',
      },
      {
        text: 'Living life like a volcano, ready to blow',
        hasAnnotation: false,
      },
      {
        text: 'Coding in binary, speaking in flows',
        hasAnnotation: true,
        annotation:
          'Merges tech references with hip-hop culture, highlighting the alienmn duality',
      },
    ],
    diy: [
      {
        text: 'Star-ted from da BOT-tom, now we HERE (emphasize HERE)',
        hasAnnotation: false,
      },
      {
        text: "Livin' life like a vol-CA-no, ready to BLOW (quick flow)",
        hasAnnotation: false,
      },
      {
        text: 'Co-ding in bi-NA-ry, spea-king in FLOWS (pause after binary)',
        hasAnnotation: false,
      },
    ],
  };

  const handleLyricClick = (
    annotation: string | undefined,
    event: MouseEvent<HTMLParagraphElement>
  ) => {
    if (annotation) {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      setActiveAnnotation({
        text: annotation,
        position: {
          top: rect.top + window.scrollY - 8,
          left: centerX + window.scrollX,
          transform: 'translate(-50%, -100%)',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-900 to-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white text-center mt-8 mb-8">
        Song Title
      </h1>

      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setViewMode('original')}
          className={`text-white border border-white px-4 py-2 rounded-lg ${
            viewMode === 'original' ? 'border-opacity-100' : 'border-opacity-50'
          }`}
        >
          Original
        </button>
        <button
          onClick={() => setViewMode('diy')}
          className={`text-white border border-white px-4 py-2 rounded-lg ${
            viewMode === 'diy' ? 'border-opacity-100' : 'border-opacity-50'
          }`}
        >
          DIY
        </button>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 max-w-2xl mx-auto relative">
        {viewMode === 'original' && (
          <p className="text-gray-400 italic text-sm mb-4">
            Dotted underlines indicate additional context about the lyrics
          </p>
        )}
        <div className="text-gray-800 space-y-4">
          {lyrics[viewMode].map((line, index) => (
            <p
              key={index}
              onClick={(e) =>
                handleLyricClick(
                  line.hasAnnotation ? line.annotation : undefined,
                  e
                )
              }
              className={`${
                line.hasAnnotation
                  ? 'border-b border-dotted border-gray-400 cursor-pointer hover:border-gray-600 inline-block'
                  : ''
              }`}
            >
              {line.text}
            </p>
          ))}
        </div>

        {activeAnnotation && (
          <div
            className="fixed bg-gray-800 text-white p-3 rounded-lg text-sm max-w-xs shadow-lg transition-opacity duration-200"
            style={{
              top: activeAnnotation.position.top,
              left: activeAnnotation.position.left,
              transform: activeAnnotation.position.transform,
            }}
            onClick={() => setActiveAnnotation(null)}
          >
            {activeAnnotation.text}
            <div className="absolute left-1/2 bottom-0 w-2 h-2 bg-gray-800 transform rotate-45 translate-y-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>
    </div>
  );
}
