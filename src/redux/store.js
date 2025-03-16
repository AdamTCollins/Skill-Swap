/**
 * Redux Store Configuration.
 *
 * Configures our central Redux store that manages application state.
 * Combines all reducer slices and configures middleware.
 *
 * Event-Driven Pattern: Our Redux store serves as a central event handler
 * and state manager. It processes events dispatched through the event bus
 * and updates state accordingly, triggering UI updates in components
 * that subscribe to the relevant state slices.
 */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import swapReducer from './slices/swapSlice';
import notificationReducer from './slices/notificationSlice';
import eventMiddleware from './middleware/eventMiddleware';

/**
 * Configuring the Redux store with all reducers and middleware.
 */
export const store = configureStore({
    reducer: {
        users: userReducer,                 // Handles user-related state.
        swaps: swapReducer,                 // Handles swap-related state.
        notifications: notificationReducer, // Handles notification-related state.
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(eventMiddleware),
});