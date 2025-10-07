import Link from 'next/link';

export default function LyricsPage() {
  const songs = [{ href: '/song', label: 'Alien Man' }];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Lyrics heading */}
      <div className="text-center mb-8">
        <h1>Lyrics</h1>
        <div className="w-full h-0.5 bg-indigo-500 mt-2 glowing-border-bottom"></div>
      </div>

      {/* Song links */}
      <ul className="flex flex-col gap-4 text-center">
        {songs.map((song) => (
          <li key={song.href}>
            <Link
              href={song.href}
              className="hover:text-indigo-100 transition-colors duration-200"
            >
              {song.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
