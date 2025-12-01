'use client';

import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import { PlusCircleIcon } from '@phosphor-icons/react';
import { iconSize } from '@/app/util/util';

export default function Team() {
    return (
        <TileGrid rows={1} cols={1}>
            <Tile>
                <div className="flex flex-col gap-8">
                    <span className="text-3xl">Team</span>
                    <span className="text-xl">
                        Looks like you are not part of a team yet. Create or join a team to split
                        and compare your tips with your colleagues.
                    </span>

                    <div className="flex flex-row gap-4">
                        <div className="flex flex-row gap-2 items-center border-action rounded-xl border-1 p-4">
                            <PlusCircleIcon size={iconSize} />
                            <button>Create a team</button>
                        </div>
                        <button>Join a team</button>
                    </div>
                </div>
            </Tile>
        </TileGrid>
    );
}
