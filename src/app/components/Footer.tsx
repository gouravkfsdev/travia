'use client';

export default function Footer() {
  return (
  <footer className="bg-white border-t border-orange-200 px-4 lg:px-6 py-4 shadow-md">
      <div className="text-center text-sm text-orange-700">
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </div>
    </footer>
  );
}
