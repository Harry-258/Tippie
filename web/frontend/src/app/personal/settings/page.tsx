'use client';

import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';

export default function Settings() {
    // TODO: bracelet settings as well?

    return (
        <TileGrid rows={1} cols={1}>
            <Tile innerClassName="block h-full w-full" outerClassName="h-full w-full">
                <span>settings</span>
            </Tile>
        </TileGrid>
    );
}
