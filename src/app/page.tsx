/**
 * Home page
 */
import StarryNightSky from '@/components/StarryNightSky';

export default function Home() {
  return (
    <StarryNightSky>
      <div className="flex flex-col items-center">
        <h1
          className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-white mb-4 md:mb-8 text-center px-4 tracking-tight"
          style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7)' }}
        >
          alienmn
        </h1>

        <ul className="flex flex-col gap-4 md:gap-6 items-center">
          <li>
            <a
              href="/lyrics"
              className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold hover:text-white transition-colors duration-200 border-b-2 border-indigo-400 pb-1 "
              style={{ textShadow: '0 0 4px rgba(255, 255, 255, 0.5)' }}
            >
              lyrics
            </a>
          </li>
        </ul>
      </div>
    </StarryNightSky>
  );
}
