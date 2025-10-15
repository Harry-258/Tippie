import React from "react";
import {Icon} from "@phosphor-icons/react";

export type ActionIcon = {
    name: Action,
    icon: Icon,
}

export type Action = 'Dashboard' | 'Analytics' | 'Trading' | 'Settings' | 'Log Out' | 'Profile' | "Advice";

export type TileProps = {
    children: React.ReactNode,
    outerClassName?: string;
    innerClassName?: string;
    bgColor?: string;
    textColor?: string;
    title?: string;
    redirectPage?: Action;
}

export type TileGridProps = {
    children: React.ReactNode,
    rows: number | string,
    cols: number | string,
    className?: string,
}

export enum Progress {
    TipAmount,
    PaymentDetails,
    FeedbackForm,
}

export type ProgressBarProps = {
    progress: Progress,
}

export type DropdownProps = {
    options: string[],
    optionCallback?: (option: string) => void,
}
