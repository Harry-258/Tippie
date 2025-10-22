'use client';

import React, { useState } from 'react';
import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import Dropdown from '@/app/components/Dropdown';
import { languages } from '@/app/util/util';

export default function TipLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [language, setLanguage] = useState('EN');

    // TODO
    function changeLanguage(newLanguage: string) {
        setLanguage(newLanguage);
    }

    return (
        <TileGrid rows={1} cols={1} className="p-5 h-full">
            <Tile innerClassName="flex flex-col" outerClassName="h-full">
                <div className="flex justify-end w-full">
                    <Dropdown options={languages} optionCallback={changeLanguage} />
                </div>

                {children}
            </Tile>
        </TileGrid>
    );
}
