// services/auth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Constant } from '../api/constant';

interface User {
  id: string;
  name?: string;
  role?: string;
}

export function useAuth(redirectToLogin = true) {
  const router = useRouter();
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(Constant.auth.me, {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user.id);
        } else if (redirectToLogin) {
          router.push('/login');
        }
      } catch (err) {
        console.error('Error during auth check:', err);
        if (redirectToLogin) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
}
