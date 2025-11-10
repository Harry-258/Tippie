import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {Auth} from "firebase-admin/auth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = resolve(__dirname, '../../tippie-ee963-firebase-adminsdk-fbsvc-16f8661098.json');

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();
export const auth: Auth = admin.auth();

console.log('Firebase Admin SDK initialized.');
