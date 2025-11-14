'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { storage } from '../utils/storage';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLoveMailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      // Reset all data to default state
      storage.resetData();
      // Force a page refresh to show default content
      router.refresh();
    }
  };

  return (
    <header className="w-full bg-[#b8d4c8] py-4 px-6 shadow-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          onClick={handleLoveMailClick}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            pathname === '/'
              ? 'bg-[#d4e4d7] text-[#5a5a5a] shadow-sm'
              : 'bg-[#e6d9e9] text-[#5a5a5a] hover:bg-[#d4e4d7]'
          }`}
        >
          Love Mail
        </Link>
        <div className="flex gap-4">
          <Link
            href="/"
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              pathname === '/'
                ? 'bg-[#e8b4a0] text-white shadow-sm'
                : 'bg-[#f5d7d7] text-[#5a5a5a] hover:bg-[#e8b4a0] hover:text-white'
            }`}
          >
            Create Mail
          </Link>
          <Link
            href="/update"
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              pathname === '/update'
                ? 'bg-[#b8d4c8] text-white shadow-sm'
                : 'bg-[#d4e4d7] text-[#5a5a5a] hover:bg-[#b8d4c8] hover:text-white'
            }`}
          >
            Update Mail
          </Link>
        </div>
      </nav>
    </header>
  );
}

