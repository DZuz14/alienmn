import Link from 'next/link';

export default function LyricsPage() {
  const songs = [{ href: '/song', label: 'Alien Man' }];

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-5xl tracking-wide font-extrabold text-white glowing-text border-b-2 border-indigo-500 pb-2 inline-block">
          Lyrics
        </h1>
      </div>
      <ul className="flex flex-col gap-4 text-xl font-bold text-center">
        {songs.map((song) => (
          <li key={song.href}>
            <Link
              href={song.href}
              className={`text-white
               font-semibold text-2xl hover:text-indigo-100 transition-colors duration-200 tracking-wide glowing-text`}
            >
              {song.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
