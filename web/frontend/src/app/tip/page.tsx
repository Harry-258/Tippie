'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Tip() {
    const params = useSearchParams();
    const userId = params.get('uid');
    const router = useRouter();

    useEffect(() => {
        router.push('/tip/amount?uid=' + userId);
    }, []);
}
