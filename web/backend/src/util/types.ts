import {FieldValue} from "@google-cloud/firestore";

export type Document = {
    title: string;
    id: string;
}

export interface ChatMessage {
    role: "User" | "Agent";
    parts: { text: string }[];
    timestamp?: number;
}