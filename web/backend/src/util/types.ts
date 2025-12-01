export type Document = {
    title: string;
    id: string;
}

export interface ChatMessage {
    role: "User" | "Agent";
    parts: { text: string }[];
    timestamp?: number;
}

export type User = {
    id: string;
    teamId: string;
    position: string;
    status: 'owner' | 'staff';
}
