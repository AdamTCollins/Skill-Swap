/**
 * Swap Slice (Redux Toolkit)
 *
 * Manages the swaps state in the Redux store, including initial state and reducers.
 * Handles swap-related events like SWAP_REQUESTED to update the state accordingly.
 *
 * Event-Driven Pattern: This slice contains event handlers (reducers) that respond
 * to swap-related events. When a SWAP_REQUESTED event is dispatched, the reducer
 * updates the state, which automatically triggers UI updates in subscribed components.
 */
import { createSlice } from '@reduxjs/toolkit';
import { SWAP_EVENTS } from '../../events/eventTypes';

// Initial state with some pre loaded swaps
const initialState = {
    swaps: [
        { id: 1, user: 'Ethan', offering: 'Carpentry', wanting: 'Gardening', avatar: 'https://via.placeholder.com/60x60?text=E' },
        { id: 2, user: 'Noah', offering: 'Graphic Design', wanting: 'Photography', avatar: 'https://via.placeholder.com/60x60?text=N' },
        { id: 3, user: 'Ava', offering: 'Spanish', wanting: 'French', avatar: 'https://via.placeholder.com/60x60?text=A' },
    ],
    loading: false,
    error: null,
};

const swapSlice = createSlice({
    name: 'swaps',
    initialState,
    reducers: {},
    // Event handlers for swap-related events
    extraReducers: (builder) => {
        builder
            // Handle SWAP_REQUESTED event
            .addCase(SWAP_EVENTS.SWAP_REQUESTED, (state, action) => {
                // Add the new swap to the beginning of the list
                state.swaps.unshift(action.payload);
            })
            // Handle SWAP_COMPLETED event
            .addCase(SWAP_EVENTS.SWAP_COMPLETED, (state, action) => {
                const swap = state.swaps.find(s => s.id === action.payload.id);
                if (swap) {
                    swap.status = 'completed';
                }
            })
            // Handle SWAP_CANCELLED event
            .addCase(SWAP_EVENTS.SWAP_CANCELLED, (state, action) => {
                state.swaps = state.swaps.filter(swap => swap.id !== action.payload.id);
            });
    }
});

export default swapSlice.reducer;