import {TileGridProps} from "@/app/util/types";

/**
 * This component should be populated with `Tile` components.
 * @param tileGridProps the properties used to populate and customize the tile.
 */
export default function TileGrid({rows, cols, className, children}: TileGridProps) {
    return (
        <div
            className={`grid ${className} gap-5 h-full`}
            style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
        >
            {children}
        </div>
    )
}