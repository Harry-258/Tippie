import {NextFunction, Request, Response} from 'express';
import {auth} from "../config/firebase.config.js";
import { DecodedIdToken } from 'firebase-admin/auth';

declare global {
    namespace Express {
        export interface Request {
            user?: DecodedIdToken;
        }
    }
}

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    try {
        req.user = await auth.verifyIdToken(token);
        next();
    } catch (error) {
        console.error('Error verifying auth token:', error);
        return res.status(403).send('Forbidden: Invalid token');
    }
};