import Link from 'next/link';
import Container from '@/components/Container';

export default function LyricsPage() {
  const songs = [{ href: '/song', label: 'Alien Man' }];

  return (
    <Container>
      <div className="text-center mb-8">
        <h1 className="border-b-2 border-indigo-500 pb-2 inline-block">
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
    </Container>
  );
}
