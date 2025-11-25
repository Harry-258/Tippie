import { createContext } from 'react';
import { Analytics } from '@/app/util/types';

export const iconSize = 20;

export const languages = ['EN', 'NL'];

export const AnalyticsContext = createContext<Analytics>({
    feedback: [],
    tips: [],
});

export const baseUrl = 'http://192.168.68.101:4000';
