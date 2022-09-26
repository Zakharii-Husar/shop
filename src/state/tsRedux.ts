import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export interface itemTypeInterface {
    brand: string;
    model: string;
    id?: string;
    color?: string;
    price?: number;
    battery?: string;
    memory?: string;
    ram?: string;
    camera?: string;
    display?: string;
    os?: string;
    connectivity?: string;
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTSDispatch: () => AppDispatch = useDispatch;
export const useTSSelector: TypedUseSelectorHook<RootState> = useSelector;