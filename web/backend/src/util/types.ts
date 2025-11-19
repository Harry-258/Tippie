import {FieldValue} from "@google-cloud/firestore";

export type Document = {
    title: string;
    id: string;
}

export
interface ChatMessage {
    role: "user" | "model";
    parts: { text: string }[];
    timestamp?: FirebaseFirestore.Timestamp | FieldValue;
}