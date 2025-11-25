import {
    Conversation,
    ConversationMessage,
    ConversationTitle,
    Message,
    MessageSender,
} from '@/app/util/types';
import { baseUrl } from '@/app/util/util';

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
     * Makes the current conversation null. Useful when starting a new conversation.
     */
    public startNewConversation() {
        this.currentConversation = null;
    }

    /**
     * Fetches the titles and corresponding IDs of all the conversations the user made.
     * @param authToken The token used to authorize the API call.
     * @return A promise object with an array of `ConversationTitle` instances.
     */
    public async fetchUserConversations(authToken: string): Promise<ConversationTitle[]> {
        try {
            const response = await fetch(baseUrl + '/api/chat', {
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

            const response = await fetch(baseUrl + `/api/chat/conversation/${conversationId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const data = await response.json();

            const messages: Message[] = [];
            for (const message of data.conversation) {
                messages.push({
                    message: message.parts,
                    timestamp: message.timestamp,
                    sender: message.role === 'Agent' ? MessageSender.Agent : MessageSender.User,
                } as Message);
            }

            messages.sort((a, b) => a.timestamp - b.timestamp);

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

    /**
     * Sends the message to the backend. If there is no current conversation, it creates a new one. Otherwise,
     * it appends the user message and the agent reply to the current conversation.
     *
     * **Warning**: this function does not fetch any new messages that may have appeared between initially loading
     * the conversation and sending the message passed as an argument. I chose to do this to minimize API calls
     * for the minimal working version of the platform. In the future, this case should be handled properly.
     *
     * @param message The message to be sent to the backend.
     * @param authToken The token used to authorize the backend request.
     */
    public async sendMessage(message: string, authToken: string) {
        try {
            if (!this.currentConversation) {
                const reply: ConversationMessage = await this.postMessage(message, authToken);

                this.currentConversation = {
                    id: reply.conversationId,
                    messages: [
                        {
                            message: message,
                            timestamp: reply.timestamp,
                            sender: MessageSender.User,
                        },
                        {
                            message: reply.message,
                            timestamp: reply.timestamp + 1,
                            sender: MessageSender.Agent,
                        },
                    ],
                };

                let title: string = message.substring(0, 40);
                if (message.length > 40) {
                    title += '...';
                }

                this.allConversations.push({
                    title: title,
                    id: reply.conversationId,
                });
            } else {
                const reply: ConversationMessage = await this.postMessage(
                    message,
                    authToken,
                    this.currentConversation.id
                );

                // const newUserMessage = {
                //     message: message,
                //     timestamp: reply.timestamp,
                //     sender: MessageSender.User,
                // };
                const newAgentMessage = {
                    message: reply.message,
                    timestamp: reply.timestamp + 1,
                    sender: MessageSender.Agent,
                };

                // this.currentConversation.messages.push(newUserMessage);
                this.currentConversation.messages.push(newAgentMessage);
            }
        } catch (error) {
            console.error('Error sending message: ' + error);
        }
    }

    /**
     * Getter function for the current conversation.
     */
    public getCurrentConversation(): Conversation | null {
        return this.currentConversation;
    }

    /**
     * Getter function for all the conversation title-ID pairs
     */
    public getAllConversations(): ConversationTitle[] {
        return this.allConversations;
    }

    /**
     * Makes a POST request to the backend with the message and an optional conversation ID. Returns the response from the AI agent.
     * @param message The message to be sent in the body of the request.
     * @param authToken The token used to authorize the API call.
     * @param conversationId The ID of the conversation to continue. If not provided, the backend will create a new conversation.
     * @returns A string containing the response from the backend.
     * @private Only used by the conversation store to make API calls. Shouldn't be exposed
     * since the conversation store is optimized to make the least amount of API calls possible.
     */
    private async postMessage(
        message: string,
        authToken: string,
        conversationId?: string
    ): Promise<ConversationMessage> {
        try {
            const requestBody: { message: string; conversationId?: string } = {
                message,
            };
            if (conversationId) {
                requestBody.conversationId = conversationId;
            }

            const response = await fetch(baseUrl + '/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            return {
                conversationId: data.reply.conversationId,
                message: data.reply.reply as string,
                timestamp: data.reply.timestamp,
            };
        } catch (error) {
            console.error('Error sending message: ' + error);
            return {
                conversationId: '',
                message: '',
                timestamp: 0,
            };
        }
    }
}
