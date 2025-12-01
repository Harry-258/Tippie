'use client';

import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import { useAuth } from '@/contexts/authContext';
import Image from 'next/image';
import React from 'react';

export default function Profile() {
    const { currentUser } = useAuth();

    return (
        <TileGrid rows={1} cols={1}>
            <Tile innerClassName="flex flex-col gap-4">
                <Image
                    src="/profile.svg"
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="border-3 border-solid border-action rounded-full"
                />
                <span>{currentUser.displayName ? currentUser.displayName : 'User'}</span>
                <span>{currentUser.email}</span>
            </Tile>
        </TileGrid>
    );
}
