import {IconType} from "react-icons";

export type ActionIcon = {
    name: Action,
    icon: IconType,
}

export type Action = 'Dashboard' | 'Analytics' | 'Trading' | 'Settings' | 'Log Out' | 'Profile';
