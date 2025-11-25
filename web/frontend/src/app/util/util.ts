import { createContext } from 'react';
import { Analytics } from '@/app/util/types';

export const iconSize = 20;

export const languages = ['EN', 'NL'];

export const AnalyticsContext = createContext<Analytics>({
    feedback: [],
    tips: [],
});

// export const baseUrl = 'http://localhost:4000';
export const baseUrl = 'http://13.51.75.18:4000';
