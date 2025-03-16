/**
 * Event Bus Service
 *
 * This service acts as the central event bus for our application's event-driven architecture.
 * It provides methods to dispatch events and handles event propagation to Redux.
 *
 * Event-Driven Pattern: Our event bus is a mediator that decouples event producers from
 * event consumers. Components can dispatch events without knowing which components will
 * handle them, promoting loose coupling and modular design.
 */
import { store } from '../redux/store';

const eventBus = {
    /**
     * Dispatches an event to the Redux store
     *c
     * @param {string} eventType - The type of event from eventTypes constants.
     * @param {object} payload - The data associated with the event.
     */
    dispatch: (eventType, payload) => {
        // Dispatching the event to Redux store.
        store.dispatch({
            type: eventType,
            payload
        });

        // Logging event for debugging and monitoring.
        console.log(`[EVENT] ${eventType}`, payload);
    },

    /**
     * Mock method that simulates socket / websocket functionality, primarily used for testing and demo.
     */
    emit: (eventType, payload) => {
        console.log(`[MOCK SOCKET EMIT] ${eventType}`, payload);
        // Just dispatching to Redux store instead of emitting to a socket.
        store.dispatch({
            type: eventType,
            payload
        });
    }
};

export default eventBus;