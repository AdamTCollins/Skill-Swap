/**
 * User Slice (Redux Toolkit)
 *
 * This manages the users state in the Redux store, including initial state and reducers.
 * Also handles user-related events like USER_JOINED to update the state accordingly.
 *
 * Event-Driven Pattern: This slice contains event handlers (reducers) that respond
 * to user-related events. When a USER_JOINED event is dispatched, the reducer
 * updates the state, which automatically triggers UI updates in subscribed components.
 */
import { createSlice } from '@reduxjs/toolkit';
import { USER_EVENTS } from '../../events/eventTypes';

// Initial state with preloaded users.
const initialState = {
    users: [
        { id: 1, name: 'Matt', age: 24, has: 'Guitar', wants: 'Gardening', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80' },
        { id: 2, name: 'Mary', age: 22, has: 'Baking', wants: 'Carpentry', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80' },
        { id: 3, name: 'Isobel', age: 25, has: 'Dancing', wants: 'Sailing', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80' },
        { id: 4, name: 'Bart', age: 21, has: 'Archery', wants: 'Photography', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80' },
        { id: 5, name: 'Elizabeth', age: 29, has: 'Sewing', wants: 'Swimming', image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80' },
        { id: 6, name: 'Tony', age: 35, has: 'Weight Lifting', wants: 'Photography', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80' },
        { id: 7, name: 'Michael', age: 30, has: 'Photography', wants: 'Cooking', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80' },
        { id: 8, name: 'Thomas', age: 32, has: 'Cooking', wants: 'Guitar', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80' }
    ],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    // Event handlers for user-related events.
    extraReducers: (builder) => {
        builder
            // Handles USER_JOINED event.
            .addCase(USER_EVENTS.USER_JOINED, (state, action) => {
                // Add the new user to the state
                state.users.push(action.payload);
            })

            // Handles USER_LEFT event.
            .addCase(USER_EVENTS.USER_LEFT, (state, action) => {
                // Remove the user from the state
                state.users = state.users.filter(user => user.id !== action.payload.id);
            })

            // Handles SKILL_UPDATED event.
            .addCase(USER_EVENTS.SKILL_UPDATED, (state, action) => {
                const { userId, skill, value } = action.payload;
                const user = state.users.find(u => u.id === userId);
                if (user) {
                    user[skill] = value;
                }
            });
    }
});

export default userSlice.reducer;