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
    | 'Learn'
    | 'Team';

export type TileProps = {
    children: React.ReactNode;
    outerClassName?: string;
    innerClassName?: string;
    bgColor?: string;
    textColor?: string;
    title?: string;
    redirectPage?: Action;
    height?: string;
};

export type TileGridProps = {
    children: React.ReactNode;
    rows: number | string;
    cols: number | string;
    className?: string;
    verticalPadding?: boolean;
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
    id: string;
};

export type ConversationTitle = {
    title: string;
    id: string;
};

export type ConversationMessage = {
    conversationId: string;
    message: string;
    timestamp: number;
};

export type Tip = {
    amount: number;
    timestamp: number;
};

export type Feedback = {
    feedback?: string;
    rating?: number;
    timestamp: number;
};

export type Analytics = {
    feedback: Feedback[];
    tips: Tip[];
};

export type UserInfo = {
    teamId: string;
    teamName: string;
    position: string;
    status: 'owner' | 'staff';
    refetch: () => Promise<void>;
};

export type ModalProps = {
    isOpen: boolean;
    type: 'success' | 'error';
    content: string;
    onClose: () => void;
};
