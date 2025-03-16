// src/context/EventContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [recentSwaps, setRecentSwaps] = useState([]);

    useEffect(() => {
        // Mock data based on your design
        setUsers([
            { id: 1, name: 'Matt', age: 24, has: 'Guitar', wants: 'Gardening', image: 'https://via.placeholder.com/200x240?text=Matt' },
            { id: 2, name: 'Mary', age: 22, has: 'Baking', wants: 'Carpentry', image: 'https://via.placeholder.com/200x240?text=Mary' },
            { id: 3, name: 'Isobel', age: 25, has: 'Dancing', wants: 'Sailing', image: 'https://via.placeholder.com/200x240?text=Isobel' },
            { id: 4, name: 'Bart', age: 21, has: 'Archery', wants: 'Photography', image: 'https://via.placeholder.com/200x240?text=Bart' },
            { id: 5, name: 'Alaya', age: 24, has: 'Karate', wants: 'Cycling', image: 'https://via.placeholder.com/200x240?text=Alaya' },
            { id: 6, name: 'Robert', age: 25, has: 'Woodworking', wants: 'Game Design', image: 'https://via.placeholder.com/200x240?text=Robert' },
            { id: 7, name: 'Elizabeth', age: 29, has: 'Sewing', wants: 'Swimming', image: 'https://via.placeholder.com/200x240?text=Elizabeth' },
            { id: 8, name: 'Tony', age: 35, has: 'Weight Lifting', wants: 'Photography', image: 'https://via.placeholder.com/200x240?text=Tony' }
        ]);

        setRecentSwaps([
            { id: 1, user: 'John', offering: 'Painting', wanting: 'Plumbing', avatar: 'https://via.placeholder.com/60x60?text=J' },
            { id: 2, user: 'Lily', offering: 'Yoga', wanting: 'Coding', avatar: 'https://via.placeholder.com/60x60?text=L' },
            { id: 3, user: 'Mark', offering: 'Swimming', wanting: 'Plumbing', avatar: 'https://via.placeholder.com/60x60?text=M' },
            { id: 4, user: 'Linda', offering: 'Cooking', wanting: 'Coding', avatar: 'https://via.placeholder.com/60x60?text=L' },
            { id: 5, user: 'Dave', offering: 'Tutoring', wanting: 'Gardening', avatar: 'https://via.placeholder.com/60x60?text=D' }
        ]);

        // Subscribe to real-time events
        eventService.subscribe('new_user', (user) => {
            setUsers(prevUsers => [...prevUsers, user]);
        });

        eventService.subscribe('new_swap', (swap) => {
            setRecentSwaps(prevSwaps => [swap, ...prevSwaps]);
        });

        return () => {
            eventService.unsubscribe('new_user');
            eventService.unsubscribe('new_swap');
        };
    }, []);

    return (
        <EventContext.Provider value={{ users, recentSwaps }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventContext = () => useContext(EventContext);