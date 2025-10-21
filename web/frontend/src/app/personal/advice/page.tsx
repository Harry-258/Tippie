'use client';

import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import React, { useEffect, useRef, useState } from 'react';
import { Conversation, MessageSender } from '@/app/util/types';
import { ArrowCircleUpIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { iconSize } from '@/app/util/util';

export default function Advice() {
    const conversationCardClass =
        'flex items-center hover:bg-gray-300 gap-1 py-2 p-1 px-6 hover:cursor-pointer mx-1 rounded-md';
    const [currentConversation, setCurrentConversation] = useState<Conversation | null>();
    const [currentInput, setCurrentInput] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    // TODO: replace this with backend call
    const [conversations, setConversations] = useState<Conversation[]>([
        {
            title: 'Extreme funnies happening right now',
            messages: [
                {
                    message: 'Bro waddup',
                    timestamp: 0,
                    sender: MessageSender.User,
                },
                {
                    message: 'Not much wassup with u',
                    timestamp: 1,
                    sender: MessageSender.Agent,
                },
            ],
        },
    ]);

    function submitMessage(): void {
        if (currentInput !== '') {
            // TODO: Replace with backend call to add message

            const newMessage = {
                message: currentInput,
                timestamp: new Date().getTime(),
                sender: MessageSender.User,
            };

            if (currentConversation) {
                setCurrentConversation({
                    messages: currentConversation.messages.concat(newMessage),
                    title: currentConversation.title,
                });
            } else {
                const newConvo = {
                    messages: [newMessage],
                    title: 'Get title from backend',
                };
                setCurrentConversation(newConvo);
                setConversations(conversations.concat(newConvo));
            }

            setCurrentInput('');
        }
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
        console.log(event.key);
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
                                        <span>{message.message}</span>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div
                        className={`w-auto mx-6 mb-6 rounded-lg shadow-md bg-background text-primary flex justify-between`}
                    >
                        <input
                            placeholder="Ask Anything"
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
