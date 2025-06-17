'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">MyApp</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/auth/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link href="#" className="hover:text-gray-300">Settings</Link>
        <Link href="#" className="hover:text-gray-300">Profile</Link>
      </nav>
    </aside>
  );
}
