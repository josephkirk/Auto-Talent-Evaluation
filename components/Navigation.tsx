'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#2463eb] text-white p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">analytics</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">AutoTalentEvaluation</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 rounded-lg px-2 py-1">
            <span className="material-symbols-outlined text-slate-400 text-sm pl-1">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-slate-500"
              placeholder="Search employees..."
              type="text"
            />
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-semibold ${
                pathname === '/' ? 'text-[#2463eb]' : 'text-slate-600 hover:text-[#2463eb]'
              } transition-colors`}
            >
              Dashboard
            </Link>
          </nav>

          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-cover bg-center border border-slate-200 bg-gradient-to-br from-blue-500 to-purple-600"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
