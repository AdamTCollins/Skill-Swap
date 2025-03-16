/**
 * Event Type Definitions
 *
 * This file defines all event types used in our application's event-driven architecture.
 * By centralizing event type definitions, we ensure consistency across the application
 * and make it easier to track and maintain event handlers.
 *
 * Event-Driven Pattern: These constants represent the various events that can occur
 * in the system. Components can subscribe to these events without knowing which
 * components might dispatch them, enabling loose coupling.
 */

// User-related events.
export const USER_EVENTS = {
    USER_JOINED: 'USER_JOINED',    // Triggered when a new user joins the system
    USER_LEFT: 'USER_LEFT',        // Triggered when a user leaves the system
    SKILL_UPDATED: 'SKILL_UPDATED' // Triggered when a user updates their skills
};

// Swap-related events.
export const SWAP_EVENTS = {
    SWAP_REQUESTED: 'SWAP_REQUESTED',   // Triggered when a user requests a skill swap
    SWAP_ACCEPTED: 'SWAP_ACCEPTED',     // Triggered when a swap request is accepted
    SWAP_COMPLETED: 'SWAP_COMPLETED',   // Triggered when a swap is marked as completed
    SWAP_CANCELLED: 'SWAP_CANCELLED'    // Triggered when a swap is cancelled
};

// Notification-related events.
export const NOTIFICATION_EVENTS = {
    NOTIFICATION_RECEIVED: 'NOTIFICATION_RECEIVED', // Triggered when a new notification arrives
    NOTIFICATION_READ: 'NOTIFICATION_READ'          // Triggered when a notification is marked as read
};