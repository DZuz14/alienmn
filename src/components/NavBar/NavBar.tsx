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
    <nav className="fixed top-0 right-0 pt-6 pr-12 z-50">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-12">
        {links
          .filter((link) => link.href !== pathname)
          .map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
      </ul>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:text-white/70 transition-colors cursor-pointer"
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
              className="absolute top-6 right-6 p-2 hover:text-white/70 transition-colors cursor-pointer"
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
                      className="hover:text-white/70 transition-colors"
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
