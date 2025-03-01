import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/lyrics', label: 'Lyrics' },
  ];

  return (
    <nav className="fixed top-0 right-0 pt-6 pr-10">
      <ul className="flex gap-6 text-xl font-bold">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${
                pathname === link.href ? 'text-white' : 'text-gray-300'
              } font-semibold text-2xl hover:text-indigo-200 transition-colors duration-200 tracking-wide`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
