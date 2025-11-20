import { Conversation, ConversationTitle, MessageSender, Message } from '@/app/util/types';
import { clearTimeout } from 'node:timers';

export class ConversationStore {
    private static instance: ConversationStore;
    private currentConversation: Conversation | null;
    private allConversations: ConversationTitle[];

    private constructor() {
        this.currentConversation = null;
        this.allConversations = [];
    }

    static getInstance() {
        if (!ConversationStore.instance) {
            ConversationStore.instance = new ConversationStore();
        }
        return ConversationStore.instance;
    }

    /**
     * Fetches the titles and corresponding IDs of all the conversations the user made.
     * @param authToken The token used to authorize the API call.
     * @return A promise object with an array of `ConversationTitle` instances.
     */
    public async fetchUserConversations(authToken: string): Promise<ConversationTitle[]> {
        try {
            const response = await fetch('http://localhost:4000/api/chat', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
            const conversations: ConversationTitle[] = data.conversations ?? [];

            this.allConversations = conversations;
            return conversations;
        } catch (error) {
            console.error('Error fetching user conversations: ' + error);
            return [];
        }
    }

    /**
     * Fetches the messages from the conversation with the provided ID.
     * @param conversationId The ID of the conversation to be fetched.
     * @param authToken The token used to authorize the API call.
     */
    public async fetchConversation(
        conversationId: string,
        authToken: string
    ): Promise<Conversation | null> {
        try {
            if (this.currentConversation && this.currentConversation.id === conversationId) {
                return this.currentConversation;
            }

            const response = await fetch(
                `http://localhost:4000/api/chat/conversation/${conversationId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            const data = await response.json();

            const messages: Message[] = [];
            for (const message of data.conversation) {
                messages.push({
                    message: message.parts,
                    timestamp: 0, // TODO: change
                    sender: message.role as MessageSender,
                } as Message);
            }

            const newConversation: Conversation = {
                messages: messages,
                id: conversationId,
            };
            this.currentConversation = newConversation;

            return newConversation;
        } catch (error) {
            console.error('Error fetching conversation: ' + error);
            return null;
        }
    }

    // public async sendMessage(message: string, timeout: NodeJS.Timeout) {
    //     if (!this.currentConversation) {
    //
    //     }
    //
    //
    //
    //
    //     const reply: string = await this.postMessage(this.currentConversation?.id, message);
    //
    //     clearTimeout(timeout);
    //
    //     if (conversationId === this.currentConversation?.id) {
    //         this.currentConversation.messages.push({
    //             message: message,
    //             sender: MessageSender.User,
    //             timestamp: 0, // TODO: replace this
    //         });
    //         this.currentConversation.messages.push({
    //             message: reply,
    //             sender: MessageSender.Agent,
    //             timestamp: 0, // TODO: replace this
    //         })
    //     } else {
    //         // TODO: fetch the current conversation
    //     }
    // }

    private async postMessage(
        conversationId: string,
        message: string,
        authToken: string
    ): Promise<string> {
        try {
            const response = await fetch('http://localhost:4000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    conversationId: conversationId,
                    message: message,
                }),
            });

            const data = await response.json();

            return data.reply.reply as string;
        } catch (error) {
            console.error('Error sending message: ' + error);
            return '';
        }
    }
}
