import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/lyrics', label: 'Lyrics' },
  ];

  return (
    <nav className="fixed top-0 right-0 pt-6 pr-6 z-50">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 font-bold">
        {links
          .filter((link) => link.href !== pathname)
          .map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-white text-xl hover:text-white/70 font-bold border-b-2 border-indigo-500 pb-2 glowing-text tracking-wide`}
              >
                {link.label}
              </Link>
            </li>
          ))}
      </ul>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2 hover:text-white/70 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Full Screen Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black backdrop-blur-sm z-50 flex items-center justify-center">
            {/* Close button in top right */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white p-2 hover:text-white/70 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            {/* Centered Navigation Links */}
            <ul className="flex flex-col items-center justify-center gap-8">
              {links
                .filter((link) => link.href !== pathname)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white text-3xl hover:text-white/70 transition-colors font-bold glowing-text tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
