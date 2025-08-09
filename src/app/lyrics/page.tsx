import Link from 'next/link';

export default function LyricsPage() {
  const songs = [{ href: '/song', label: 'Alien Man' }];

  return (
    <>
      <h1 className="text-4xl tracking-wide font-extrabold text-white mb-8">
        Lyrics
      </h1>
      <ul className="flex flex-col gap-4 text-xl font-bold text-center">
        {songs.map((song) => (
          <li key={song.href}>
            <Link
              href={song.href}
              className={`
               font-semibold text-2xl hover:text-indigo-100 transition-colors duration-200 tracking-wide`}
            >
              {song.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
