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
      <ul className="flex gap-6 font-bold">
        {links
          .filter((link) => link.href !== pathname)
          .map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-white text-2xl hover:text-white/70 font-bold border-b-2 border-indigo-500 pb-2`}
              >
                {link.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
