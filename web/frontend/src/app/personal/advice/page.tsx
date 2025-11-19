'use client';

import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import React, { useEffect, useRef, useState } from 'react';
import { Conversation, MessageSender } from '@/app/util/types';
import { ArrowCircleUpIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { iconSize } from '@/app/util/util';
import { auth } from '@/firebase/firebaseClient';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TailSpin } from 'react-loader-spinner';
import { fetchUserConversations } from '@/app/util/apiCalls';

export default function Advice() {
    // TODO: Make conversation always show the latest message, even when it's scrollable

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversation, setCurrentConversation] = useState<Conversation | null>();
    const [currentInput, setCurrentInput] = useState<string>('');
    const [isWaitingForResponse, setIsWaitingForResponse] = useState<boolean>(false);
    const [errorIsShowing, setErrorIsShowing] = useState<boolean>(false);
    const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const conversationCardClass =
        'flex items-center hover:bg-gray-300 gap-1 py-2 p-1 px-6 hover:cursor-pointer mx-1 rounded-md';

    async function submitMessage() {
        setErrorIsShowing(false);
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
        }

        const currentInputText = currentInput.trim();
        setCurrentInput('');

        if (currentInputText !== '') {
            setLoadingTimeout(
                setTimeout(() => {
                    setErrorIsShowing(true);
                    setIsWaitingForResponse(false);
                }, 10000)
            );

            setIsWaitingForResponse(true);

            const user = auth.currentUser;
            if (!user) {
                console.error('User is not authenticated');
                return;
            }

            const token = await user.getIdToken();

            const newMessage = {
                message: currentInputText,
                timestamp: new Date().getTime(),
                sender: MessageSender.User,
            };
            const currentMessages = (currentConversation?.messages ?? []).concat(newMessage);
            const currentTitle = currentConversation?.title ?? 'Get title from backend';

            if (!currentConversation) {
                const newConvo = {
                    messages: [newMessage],
                    title: currentTitle,
                };
                setCurrentConversation(newConvo);
                setConversations(conversations.concat(newConvo));
            } else {
                setCurrentConversation({
                    messages: currentMessages,
                    title: currentTitle,
                });
            }

            fetch('http://localhost:4000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: currentInputText,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const replyMessage: string = data.reply.reply;

                    const newResponseMessage = {
                        message: replyMessage,
                        timestamp: new Date().getTime(),
                        sender: MessageSender.Agent,
                    };
                    // TODO: add new title
                    setCurrentConversation({
                        messages: currentMessages.concat(newResponseMessage),
                        title: currentTitle,
                    });

                    setIsWaitingForResponse(false);
                    clearTimeout(loadingTimeout);
                })
                .catch(err => {
                    clearTimeout(loadingTimeout);
                    setIsWaitingForResponse(false);
                    setErrorIsShowing(true);
                    console.error(err);
                });
        }
    }

    async function getUserConversations() {
        const user = auth.currentUser;
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        const token = await user.getIdToken();

        await fetchUserConversations(token, setConversations);
    }

    useEffect(() => {
        window.addEventListener('keydown', keyboardShortcutHandler);
        inputRef.current?.focus();

        return () => window.removeEventListener('keydown', keyboardShortcutHandler);
    });

    /**
     * Handles the shortcuts for the `/personal/advice` page.
     * @param event the event that comes from pressing a key or combination of keys
     */
    function keyboardShortcutHandler(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            submitMessage();
        }
    }

    return (
        <TileGrid rows={1} cols={1}>
            <Tile innerClassName="flex py-0 px-0">
                <div className="h-full w-1/4 border-r-3 border-background flex flex-col overflow-auto">
                    <span className="ml-6 mt-6 mb-4 text-primary/70 truncate text-lg">
                        Conversations:
                    </span>
                    <hr className="w-auto mx-4 text-background border-t-2 rounded-full" />
                    <div
                        className={conversationCardClass}
                        onClick={() => {
                            setCurrentConversation(null);
                            setCurrentInput('');
                            setErrorIsShowing(false);
                            inputRef.current?.focus();
                        }}
                    >
                        <PlusCircleIcon className="text-primary" size={iconSize} />
                        <span className="truncate">New Conversation</span>
                    </div>
                    {conversations.map((conversation: Conversation, index: number) => (
                        <div
                            className={conversationCardClass}
                            key={index}
                            onClick={() => {
                                setCurrentConversation(conversation);
                                setCurrentInput('');
                                setErrorIsShowing(false);
                                inputRef.current?.focus();
                            }}
                        >
                            <span className="truncate">{conversation.title}</span>
                        </div>
                    ))}
                </div>

                <div className="h-full w-full flex flex-col justify-between">
                    <div className="flex flex-col gap-4 overflow-y-auto pb-10 mt-6">
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
                            placeholder="Ask anything"
                            ref={inputRef}
                            className={'w-full h-full p-4 rounded-lg focus:outline-none'}
                            value={currentInput}
                            onChange={event => setCurrentInput(event.target.value)}
                        />
                        <div className="m-4 hover:cursor-pointer" onClick={submitMessage}>
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
