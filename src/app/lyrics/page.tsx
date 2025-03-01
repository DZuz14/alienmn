import Link from 'next/link';

export default function LyricsPage() {
  const songs = [
    { href: '/lyrics/song1', label: 'Song 1' },
    { href: '/lyrics/song2', label: 'Song 2' },
    { href: '/lyrics/song3', label: 'Song 3' },
    // Add more songs here as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-900 to-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-6xl tracking-wide font-extrabold text-white mb-8">
        Lyrics
      </h1>
      <ul className="flex flex-col gap-4 text-xl font-bold">
        {songs.map((song) => (
          <li key={song.href}>
            <Link
              href={song.href}
              className={`text-gray-300
               font-semibold text-2xl hover:text-indigo-200 transition-colors duration-200 tracking-wide`}
            >
              {song.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
