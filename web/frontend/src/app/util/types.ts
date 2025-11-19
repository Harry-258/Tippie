import React from 'react';
import { Icon } from '@phosphor-icons/react';

export type ActionIcon = {
    name: Action;
    icon: Icon;
};

export type Action =
    | 'Dashboard'
    | 'Analytics'
    | 'Trading'
    | 'Settings'
    | 'Log Out'
    | 'Profile'
    | 'Advice';

export type TileProps = {
    children: React.ReactNode;
    outerClassName?: string;
    innerClassName?: string;
    bgColor?: string;
    textColor?: string;
    title?: string;
    redirectPage?: Action;
};

export type TileGridProps = {
    children: React.ReactNode;
    rows: number | string;
    cols: number | string;
    className?: string;
};

export enum Progress {
    TipAmount,
    PaymentDetails,
    FeedbackForm,
}

export type ProgressBarProps = {
    progress: Progress;
    className?: string;
};

export type DropdownProps = {
    options: string[];
    optionCallback?: (option: string) => void;
};

export type DescriptionCardWithImageProps = {
    imageSrc: string;
    imageSize?: number;
    title: string;
    content: string;
    imageOnTheLeft?: boolean;
};

export type Message = {
    message: string;
    timestamp: number;
    sender: MessageSender;
};

export enum MessageSender {
    User,
    Agent,
}

export type Conversation = {
    messages: Message[];
    title: string;
    id: string;
};
