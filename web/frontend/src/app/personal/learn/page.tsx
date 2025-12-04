'use client';

import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import React, { useEffect, useRef, useState } from 'react';
import { Conversation, ConversationTitle, MessageSender } from '@/app/util/types';
import { ArrowCircleUpIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { iconSize } from '@/app/util/util';
import { auth } from '@/firebase/firebaseClient';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TailSpin } from 'react-loader-spinner';
import { ConversationStore } from '@/app/util/ConversationStore';

export default function Learn() {
    const [conversations, setConversations] = useState<ConversationTitle[]>([]);
    const [currentConversation, setCurrentConversation] = useState<Conversation | null>();
    const [currentInput, setCurrentInput] = useState<string>('');
    const [isWaitingForResponse, setIsWaitingForResponse] = useState<boolean>(false);
    const [errorIsShowing, setErrorIsShowing] = useState<boolean>(false);
    const [showingSuggestions, setShowingSuggestions] = useState<boolean>(true);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollableAreaRef = useRef<HTMLDivElement>(null);

    const conversationStore = ConversationStore.getInstance();

    const conversationCardClass =
        'flex items-center hover:bg-gray-300 gap-1 py-2 p-1 px-6 hover:cursor-pointer mx-1 rounded-md';

    /**
     * Scrolls the div element that contains all the messages from the current conversation to the bottom.
     * Uses a timeout to make sure the current conversation is loaded and for the operation to look more natural.
     */
    function scrollToBottom() {
        setTimeout(() => {
            scrollableAreaRef.current?.scrollTo({
                top: scrollableAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }, 100);
    }

    /**
     * Handles the logic for submitting messages.
     * @param input If a string should be used instead of the currentInput.
     */
    async function submitMessage(input?: string) {
        setShowingSuggestions(false);

        // Stop showing any error messages
        setErrorIsShowing(false);
        setIsWaitingForResponse(true);

        // Save the message and clear the input. Don't do anything if the input is empty.
        let currentInputText = currentInput.trim();
        if (!input && currentInputText === '') {
            return;
        } else if (input) {
            currentInputText = input;
        }
        setCurrentInput('');

        // Get the authorization token
        const user = auth.currentUser;
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        const token = await user.getIdToken();

        // Set a timeout for the request, after which it will show the error message
        const timeout: NodeJS.Timeout = setTimeout(() => {
            setErrorIsShowing(true);
            setIsWaitingForResponse(false);
        }, 10000);

        // Optimistiaclly add the user message on the frontend. Only for the user to see while fetching the response.
        if (!currentConversation) {
            setCurrentConversation({
                id: '',
                messages: [
                    {
                        message: currentInputText,
                        sender: MessageSender.User,
                        timestamp: 0,
                    },
                ],
            });
        } else {
            const currentMessages = currentConversation.messages;
            const currentConversationId = currentConversation.id;
            currentMessages.push({
                message: currentInputText,
                sender: MessageSender.User,
                timestamp: currentMessages[currentMessages.length - 1].timestamp + 1,
            });

            setCurrentConversation({
                id: currentConversationId,
                messages: currentMessages,
            });
        }

        // Send the message using the conversation store.
        await conversationStore.sendMessage(currentInputText, token);

        clearTimeout(timeout);

        setCurrentConversation(conversationStore.getCurrentConversation());
        setConversations(conversationStore.getAllConversations());
        setIsWaitingForResponse(false);

        scrollToBottom();
    }

    useEffect(() => {
        async function getUserConversations() {
            const user = auth.currentUser;
            if (!user) {
                console.error('User is not authenticated');
                return;
            }

            const token = await user.getIdToken();
            setConversations(await conversationStore.fetchUserConversations(token));
        }

        getUserConversations();
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', keyboardShortcutHandler);
        inputRef.current?.focus();

        return () => window.removeEventListener('keydown', keyboardShortcutHandler);
    });

    /**
     * Switches the current conversation to the one with the provided ID.
     * @param conversationId The ID associated with the conversation to be switched to.
     */
    async function switchCurrentConversation(conversationId: string) {
        setCurrentInput('');
        setErrorIsShowing(false);
        inputRef.current?.focus();

        const user = auth.currentUser;
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        const token = await user.getIdToken();

        setCurrentConversation(await conversationStore.fetchConversation(conversationId, token));
        scrollToBottom();
    }

    /**
     * Handles the shortcuts for the `/personal/advice` page.
     * @param event the event that comes from pressing a key or combination of keys
     */
    async function keyboardShortcutHandler(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            await submitMessage();
        }
    }

    return (
        <TileGrid rows={1} cols={1}>
            <Tile innerClassName="flex py-0 px-0">
                <div className="w-2/5 border-r-3 border-background flex flex-col overflow-auto pb-10 my-4">
                    <span className="ml-6 mt-2 mb-4 text-primary/70 text-lg">Conversations:</span>
                    <hr className="w-auto mx-4 text-background border-t-2 rounded-full" />
                    <div
                        className={conversationCardClass}
                        onClick={() => {
                            conversationStore.startNewConversation();
                            setShowingSuggestions(true);
                            setCurrentConversation(null);
                            setCurrentInput('');
                            setErrorIsShowing(false);
                            inputRef.current?.focus();
                            setConversations(conversationStore.getAllConversations());
                        }}
                    >
                        <PlusCircleIcon className="text-primary" size={iconSize} />
                        <span className="truncate">New Conversation</span>
                    </div>
                    {conversations.map((conversation: ConversationTitle, index: number) => (
                        <div
                            className={conversationCardClass}
                            key={index}
                            onClick={() => switchCurrentConversation(conversation.id)}
                        >
                            <span className="truncate">{conversation.title}</span>
                        </div>
                    ))}
                </div>

                <div className="h-full w-full flex flex-col justify-between">
                    <div
                        className={`flex flex-col gap-4 overflow-y-auto ${!currentConversation ? 'items-center h-full justify-center' : 'pb-10 mt-6 mb-4'}`}
                        ref={scrollableAreaRef}
                    >
                        {!currentConversation && showingSuggestions && (
                            <div className="flex justify-self-center items-center flex-col gap-4">
                                <span className="text-2xl text-primary/70">Suggestions:</span>
                                <div className="flex flex-row gap-4 justify-center">
                                    <button
                                        className="p-4 border-action border-2 shadow-sm rounded-xl text-wrap
                                            w-1/3 text-left hover:scale-[1.01] transition duration-200
                                            hover:cursor-pointer hover:shadow-md"
                                        onClick={() => {
                                            submitMessage(
                                                'How do taxes work when investing in stocks in the Netherlands?'
                                            );
                                        }}
                                    >
                                        How do taxes work when investing in stocks in the
                                        Netherlands?
                                    </button>
                                    <button
                                        className="p-4 border-action border-2 shadow-sm rounded-xl text-wrap
                                            w-1/3 text-left hover:scale-[1.01] transition duration-200
                                            hover:cursor-pointer hover:shadow-md"
                                        onClick={() => {
                                            submitMessage(
                                                'What are the risks of investing in the stock market?'
                                            );
                                        }}
                                    >
                                        What are the risks of investing in the stock market?
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentConversation &&
                            currentConversation.messages.map((message, index: number) => (
                                <div
                                    className={`${message.sender === MessageSender.User ? 'justify-end' : ''} flex w-auto`}
                                    key={index}
                                >
                                    <div
                                        className={`p-4 mx-6 ${
                                            message.sender === MessageSender.Agent
                                                ? 'py-2'
                                                : 'rounded-lg bg-background shadow-md w-fit'
                                        }`}
                                    >
                                        <Markdown remarkPlugins={[remarkGfm]}>
                                            {message.message}
                                        </Markdown>
                                    </div>
                                </div>
                            ))}
                        {isWaitingForResponse && (
                            <div className="flex flex-row gap-2 mx-10 items-center text-gray-400">
                                <TailSpin
                                    visible={true}
                                    height="20"
                                    width="20"
                                    color="#9CA3AF"
                                    radius="4"
                                    ariaLabel="oval-loading"
                                />
                                <span>Waiting for response...</span>
                            </div>
                        )}
                        {errorIsShowing && (
                            <div className="flex flex-row gap-2 mx-10 items-center text-red-500">
                                <span>Error: Something went wrong. Please try again.</span>
                            </div>
                        )}
                    </div>

                    <div
                        className={`w-auto mx-6 mb-6 rounded-lg shadow-md bg-background text-primary flex justify-between`}
                    >
                        <input
                            disabled={isWaitingForResponse}
                            placeholder="Ask anything"
                            ref={inputRef}
                            className={'w-full h-full p-4 rounded-lg focus:outline-none'}
                            value={currentInput}
                            onChange={event => setCurrentInput(event.target.value)}
                        />
                        <div className="m-4 hover:cursor-pointer" onClick={() => submitMessage()}>
                            <ArrowCircleUpIcon
                                size={30}
                                className="text-gray-400 hover:text-gray-500"
                                weight="light"
                            />
                        </div>
                    </div>
                </div>
            </Tile>
        </TileGrid>
    );
}
