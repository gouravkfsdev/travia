'use client';

import Layout from '../../components/Layout';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../service/auth';
import { Constant } from '../../api/constant';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await fetch(Constant.auth.logout, {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/login');
  };

  if (!user || loading) return <p>Loading...</p>;

  return (
    <Layout>
      <h1 className="text-xl font-bold text-blue-600">Welcome, {user.name} 👋</h1>
      <p className="mb-4 text-red-600">Role: {user.role}</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </Layout>
  );
}
