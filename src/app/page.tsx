// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // Redirect root to /landing
}
