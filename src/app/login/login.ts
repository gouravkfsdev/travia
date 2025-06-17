'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Constant } from '../api/constant';

export function useHandleLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    formData: { username: string; password: string , remember: string },
    showToast: (message: string, type?: 'success' | 'error') => void
  ) => {
    try {
      setLoading(true);

      const res = await fetch(Constant.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Login successfully Redirect ..", "success");

        // Delay redirect by 1s to let toast show
        setTimeout(() => {
          router.push('/auth/dashboard');
        }, 2000);
      } else {
        showToast(data.error || 'Login failed', 'error');
      }
    } catch (err) {
      showToast("Network error", 'error');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
