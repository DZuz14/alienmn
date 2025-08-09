/**
 * Home page
 */

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1
        className="text-4xl lg:text-6xl font-extrabold text-white mb-4 text-center px-4 tracking-tight border-b-2 border-indigo-400 pb-6"
        // style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7)' }}
      >
        alienmn
      </h1>

      <ul className="flex flex-col gap-4 md:gap-6 items-center">
        <li>
          <a
            href="/lyrics"
            className="text-3xl text-white font-extrabold hover:text-indigo-100 transition-colors duration-200"
          >
            lyrics
          </a>
        </li>
      </ul>
    </div>
  );
}
