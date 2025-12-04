import { createContext } from 'react';
import { Analytics } from '@/app/util/types';

export const iconSize = 20;

export const languages = ['EN'];

export const AnalyticsContext = createContext<Analytics>({
    feedback: [],
    tips: [],
});
