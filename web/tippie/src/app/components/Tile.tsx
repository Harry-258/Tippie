'use client';

import {TileProps} from "@/app/util/types";

/**
 * This component should only be used inside a `TileGrid`.
 *
 * @param tileProps the properties used to populate and customize the tile.
 */
export default function Tile({children, outerClassName, innerClassName, bgColor, textColor, title}: TileProps) {
    return (
        <div className={`${outerClassName} rounded-3xl ${bgColor ? bgColor : 'bg-white'} h-full w-full`}>
            {/*{title !== "" && title !== null ?*/}
            {/*    <div className="w-full text-center mt-10 mb-4">*/}
            {/*            <span className="font-semibold text-lg">*/}
            {/*                {title}*/}
            {/*            </span>*/}
            {/*    </div>*/}
            {/*    : null*/}
            {/*}*/}
            {/*{title &&*/}
            {/*    <h3 className={`font-semibold text-lg w-full text-center m-4 ${textColor ? textColor : 'text-primary'}`}>*/}
            {/*        {title}*/}
            {/*    </h3>*/}
            {/*}*/}

            {title &&
                <div className="mt-4 text-center w-full">
                    <span
                        className={`font-bold text-lg ${textColor ? textColor : 'text-primary'}`}
                    >
                        {title}
                    </span>
                </div>
            }

            <div className={`${innerClassName} ${title ? 'pt-0' : ''} p-5 ${textColor ? textColor : 'text-primary'} h-full w-full`}>
                {children}
            </div>
        </div>
    )
}