import {model} from '../config/firebase.config.js';

export async function getConversation(uid: string, conversationId: string) {

}

export async function getAllConversations(uid: string) {

}

export async function processChat(uid: string, message: string) {
    // TODO: add past messages to prompt or create a new one from template if it's the first message
    const prompt = "" + message;

    const result = await model.generateContent();
    const response = result.response;
    const text = response.text();

    console.log(text);

    return text;
}