/**
 * UserCards Component.
 *
 * Displays a grid of UserCard components based on the current users in the Redux store.
 * Subscribes to Redux state changes and re-renders when the users array is updated.
 *
 * Event-Driven Pattern: This component subscribes to the Redux store, which is updated
 * by events dispatched through the event bus. When a USER_JOINED event occurs, the
 * Redux state updates, causing this component to re-render with the new user list.
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import UserCard from '../userCard/UserCard';

// Grid layout for displaying user cards.
const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 5px;
`;

/**
 * UserCards component that displays all users in a grid.
 * It listens to Redux state changes to update when users are added/removed.
 */
const UserCards = () => {
    // Subscribe to the users array in Redux state.
    const users = useSelector((state) => state?.users?.users || []);
    // Track the previous user count to identify new additions.
    const [prevUserCount, setPrevUserCount] = useState(users.length);

    // Effect to track when new users are added to log and update counters.
    useEffect(() => {
        if (users.length > prevUserCount) {
            console.log(`[EVENT] ${users.length - prevUserCount} new users joined!`);
            setPrevUserCount(users.length);
        }
    }, [users, prevUserCount]);

    return (
        <CardsContainer>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    isNew={user.id > 13} // IDs > 13 are considered new users for animation
                />
            ))}
        </CardsContainer>
    );
};

export default UserCards;