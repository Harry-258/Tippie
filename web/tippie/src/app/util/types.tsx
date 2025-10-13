import {IconType} from "react-icons";
import React from "react";

export type ActionIcon = {
    name: Action,
    icon: IconType,
}

export type Action = 'Dashboard' | 'Analytics' | 'Trading' | 'Settings' | 'Log Out' | 'Profile';

export type TileProps = {
    children: React.ReactNode,
    outerClassName?: string;
    innerClassName?: string;
}

export type TileGridProps = {
    children: React.ReactNode,
    rows: number | string,
    cols: number | string,
    className?: string,
}
