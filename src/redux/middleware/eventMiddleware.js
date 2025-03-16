/**
 * Event Middleware for Redux.
 *
 * Intercepts actions dispatched to Redux and performs side effects based on event types.
 * Our middleware helps maintain separation of concerns by handling side effects
 * outside of the reducers, which should remain pure functions.
 *
 * Event-Driven Pattern: Our middleware listens for specific events and performs
 * additional tasks like logging, analytics, or triggering other events. It acts as
 * an event processor that can respond to events without modifying the event flow.
 */
import { USER_EVENTS, SWAP_EVENTS, NOTIFICATION_EVENTS } from '../../events/eventTypes';

/**
 * Redux middleware for handling event-based side effects.
 *
 * @param {Object} store - The Redux store
 * @returns {Function} Middleware function
 */
const eventMiddleware = store => next => action => {
    // Letting the action pass through first (update state).
    const result = next(action);

    // Then handling side effects based on event type.
    switch (action.type) {
        case USER_EVENTS.USER_JOINED:
            // Logging user join events.
            console.log(`User ${action.payload.name} joined the platform`);
            // Could also trigger notifications, analytics, etc.
            break;

        case SWAP_EVENTS.SWAP_REQUESTED:
            // Logging swap request events.
            console.log(`New swap request from ${action.payload.requesterName}`);
            // Could trigger notifications to the recipient.
            break;

        case NOTIFICATION_EVENTS.NOTIFICATION_RECEIVED:
            // Logging notification events.
            console.log(`New notification: ${action.payload.message}`);
            // Could trigger sound or visual alert.
            break;

        default:
            break;
    }

    return result;
};

export default eventMiddleware;