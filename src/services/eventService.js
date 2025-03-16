// src/services/eventService.js
// Replace any Socket.io connection with a mock implementation:

export const eventService = {
    subscribe: (event, callback) => {
        // Just log for now
        console.log(`[EVENT SERVICE] Subscribed to ${event}`);
        // Return a function that would be used to unsubscribe
        return () => console.log(`[EVENT SERVICE] Unsubscribed from ${event}`);
    },

    emit: (event, data) => {
        console.log(`[EVENT SERVICE] Emitted ${event}`, data);
        // You could dispatch to Redux store here if needed
    }
};