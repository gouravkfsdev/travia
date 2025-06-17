'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
