'use client';

import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';

export default function Page() {
    const { loggedIn } = useAuth();

    if (loggedIn) {
        redirect('/personal/dashboard');
    } else {
        redirect('/auth/login');
    }
}
