'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserInfo } from '@/app/util/types';
import { getUserInfo } from '@/app/util/apiCalls';
import { auth } from '@/firebase/firebaseClient';

export const UserContext = createContext<UserInfo>({
    teamId: '',
    teamName: '',
    position: '',
    status: 'staff',
    refetch: async () => {},
});

export function useUserContext() {
    return useContext(UserContext);
}

export default function UserInfoProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [teamId, setTeamId] = useState('');
    const [teamName, setTeamName] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState<'staff' | 'owner'>('staff');

    useEffect(() => {
        refetch();
    }, []);

    const refetch = async () => {
        const user = auth.currentUser;
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        const token = await user.getIdToken();
        const userInfo = await getUserInfo(token);

        setTeamId(userInfo.teamId);
        setTeamName(userInfo.teamName);
        setPosition(userInfo.position);
        setStatus(userInfo.status);
    };

    return (
        <UserContext.Provider
            value={{
                teamId,
                teamName,
                position,
                status,
                refetch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
