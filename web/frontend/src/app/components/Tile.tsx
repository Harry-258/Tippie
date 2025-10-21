'use client';

import { TileProps } from '@/app/util/types';
import Link from 'next/link';

/**
 * This component should only be used inside a `TileGrid`.
 *
 * @param tileProps the properties used to populate and customize the tile.
 */
export default function Tile({
    children,
    outerClassName,
    innerClassName,
    bgColor,
    textColor,
    title,
    redirectPage,
}: TileProps) {
    const elements = (
        <div
            className={`
                ${redirectPage ? 'hover:shadow-lg transition-all duration-300' : outerClassName} rounded-3xl
                ${bgColor ? bgColor : 'bg-white'}
                h-full w-full shadow-md`}
        >
            {title && (
                <div
                    className={`font-bold text-lg ${textColor ? textColor : 'text-primary'} text-center w-full p-4`}
                >
                    {title}
                </div>
            )}
            <div
                className={`${innerClassName} ${title ? 'pt-0' : ''} p-5 ${textColor ? textColor : 'text-primary'} h-full w-full`}
            >
                {children}
            </div>
        </div>
    );

    if (redirectPage) {
        return (
            <Link
                href={`/personal/${redirectPage.toLowerCase()}`}
                className={`transition-transform duration-300 hover:scale-[1.01] ${outerClassName}`}
            >
                {elements}
            </Link>
        );
    }

    return elements;
}
