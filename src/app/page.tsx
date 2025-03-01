/**
 * Home page
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-900 to-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1
          className="text-[108px] font-extrabold  text-white mb-4"
          style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7)' }}
        >
          alienmn
        </h1>

        <ul className="flex flex-col gap-8 items-center">
          <li>
            <a
              href="/lyrics"
              className="text-gray-300 font-semibold text-4xl hover:text-indigo-200 transition-colors duration-200 tracking-wide"
            >
              lyrics
            </a>
          </li>
          <li>
            <a
              href="/lyrics"
              className="text-gray-300 font-semibold text-4xl hover:text-indigo-200 transition-colors duration-200 tracking-wide"
            >
              contact{' '}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
