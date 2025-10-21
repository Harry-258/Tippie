'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/authContext';

export default function Profile() {
    const [test, setTest] = useState<string>('');
    const { currentUser } = useAuth();

    useEffect(() => {
        fetch('http://localhost:4000/api/test')
            .then(res => res.json())
            .then(data => setTest(data.user))
            .catch(err => console.log(err));
    });

    return (
        <div className="text-primary">
            Hello, {test}! Signed in as{' '}
            {currentUser.displayName ? currentUser.displayName : currentUser.email}
        </div>
    );
}
