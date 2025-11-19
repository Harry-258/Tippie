import { Conversation } from '@/app/util/types';

export async function fetchUserConversations(
    token: string,
    setConversations: (conversations: Conversation[]) => void
) {
    try {
        fetch('http://localhost:4000/api/chat', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const conversations = data.conversations ?? [];
                setConversations(conversations);
            });
    } catch (error) {
        console.error('Error fetching user conversations: ' + error);
        return;
    }
}

export async function fetchConversation(conversationId: string, token: string) {
    try {
        fetch(`http://localhost:4000/api/chat/${conversationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                return data.messages;
            });
    } catch (error) {
        console.error('Error fetching conversation: ' + error);
    }
}
