import { configureStore } from '@reduxjs/toolkit';
import { reducers } from '../reducers';

// Function to save the Redux state to localStorage
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('store', serializedState);
    } catch (error) {
        console.error('Could not save state:', error);
    }
};

// Function to load the Redux state from localStorage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('store');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Could not load state:', error);
        return undefined;
    }
};

// Load persisted state
const persistedState = loadFromLocalStorage();

// Create the Redux store
const store = configureStore({
    reducer: reducers,
    preloadedState: persistedState,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

// Subscribe to save the state to localStorage after every action
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;
