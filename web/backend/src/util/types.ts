export type Document = {
    title: string;
    id: string;
}

export interface ChatMessage {
    role: "User" | "Agent";
    parts: { text: string }[];
    timestamp?: number;
}

export type UserInfo = {
    teamId: string;
    teamName: string;
    position: string;
    status: 'owner' | 'staff';
}
