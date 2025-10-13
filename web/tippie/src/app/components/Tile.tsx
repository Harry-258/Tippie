'use client';

import {TileProps} from "@/app/util/types";

/**
 * This component should only be used inside a `TileGrid`.
 *
 * @param tileProps the properties used to populate and customize the tile.
 */
export default function Tile({children, outerClassName, innerClassName}: TileProps) {
    return (
        <div className={`${outerClassName} rounded-3xl bg-white h-full w-full`}>
            <div className={`${innerClassName} p-10 text-primary h-full w-full`}>
                {children}
            </div>
        </div>
    )
}