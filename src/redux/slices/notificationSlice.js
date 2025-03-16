// src/redux/slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { NOTIFICATION_EVENTS, USER_EVENTS, SWAP_EVENTS } from '../../events/eventTypes';

const initialState = {
    items: [],
    unreadCount: 0,
};

let nextId = 1;

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearNotification: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.unreadCount = state.items.filter(item => !item.read).length;
        },
        markAsRead: (state, action) => {
            const notification = state.items.find(item => item.id === action.payload);
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadCount--;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(NOTIFICATION_EVENTS.NOTIFICATION_RECEIVED, (state, action) => {
                state.items.push({
                    id: nextId++,
                    ...action.payload,
                    read: false,
                    timestamp: new Date().toISOString()
                });
                state.unreadCount++;
            })
            .addCase(USER_EVENTS.USER_JOINED, (state, action) => {
                // Create notification when user joins
                state.items.push({
                    id: nextId++,
                    title: 'New User',
                    message: `${action.payload.name} has joined Skill Swap!`,
                    read: false,
                    timestamp: new Date().toISOString()
                });
                state.unreadCount++;
            })
            .addCase(SWAP_EVENTS.SWAP_REQUESTED, (state, action) => {
                // Create notification for swap request
                state.items.push({
                    id: nextId++,
                    title: 'New Swap Request',
                    message: `${action.payload.requesterName} wants to swap ${action.payload.requesterSkill} for your ${action.payload.requestedSkill}`,
                    read: false,
                    timestamp: new Date().toISOString()
                });
                state.unreadCount++;
            });
    }
});

export const { clearNotification, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;