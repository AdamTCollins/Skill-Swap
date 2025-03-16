/**
 * Main Application Component
 *
 * This is the root component of our Skill Swap application which implements an event-driven architecture.
 * It orchestrates the overall layout and initializes the event simulation for dynamic user additions.
 *
 */

// Imports
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AdminAppBar from './components/AdminAppBar';
import SwapDiscover from './components/swapDiscover/SwapDiscover';
import RecentSwaps from './components/recentSwaps/RecentSwaps';
import UserCards from './components/swapDiscover/UserCards';
import eventBus from './events/eventBus';
import { USER_EVENTS } from './events/eventTypes';

// Styling components for layout structure.
const AppContainer = styled.div`
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
`;

const Layout = styled.div`
    display: grid;
    grid-template-columns: 320px 1fr;
    margin-top: 20px;
`;

const Sidebar = styled.aside`
    border-right: 1px solid #eee;
    background-color: #fff;
`;

const MainContent = styled.main`
    background-color: #fdfdfd;
    padding: 20px 25px;
`;

function App() {
    /**
     * Effect hook that simulates real-time user events.
     *
     * Here, we are demonstrating our event-driven architecture by dispatching USER_JOINED events
     * at different time intervals. Each event contains user data that will propagate
     * through the Redux store to update the UI components without direct coupling.
     */
    useEffect(() => {
        // Simulating multiple users joining at different times.
        // First user joins after 3 seconds.
        const timer1 = setTimeout(() => {
            eventBus.dispatch(USER_EVENTS.USER_JOINED, {
                id: 14,
                name: 'Sarah',
                age: 28,
                has: 'Painting',
                wants: 'Cooking',
                image: 'https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80'
            });
        }, 3000);

        // Second user joins after 6 seconds.
        const timer2 = setTimeout(() => {
            eventBus.dispatch(USER_EVENTS.USER_JOINED, {
                id: 15,
                name: 'Alex',
                age: 31,
                has: 'Drumming',
                wants: 'Singing',
                image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80'
            });
        }, 6000);

        // Third user joins after 9 seconds.
        const timer3 = setTimeout(() => {
            eventBus.dispatch(USER_EVENTS.USER_JOINED, {
                id: 16,
                name: 'Jordan',
                age: 26,
                has: 'Web Development',
                wants: 'UI Design',
                image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80'
            });
        }, 9000);

        // Fourth user joins after 12 seconds.
        const timer4 = setTimeout(() => {
            eventBus.dispatch(USER_EVENTS.USER_JOINED, {
                id: 17,
                name: 'Rachel',
                age: 29,
                has: 'Digital Marketing',
                wants: 'Archery',
                image: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&w=400&q=80'
            });
        }, 12000);


        // Cleaning up timers to prevent memory leaks.
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    return (
        <AppContainer>
            <AdminAppBar />
            <Layout>
                <Sidebar>
                    <SwapDiscover />
                    <RecentSwaps />
                </Sidebar>
                <MainContent>
                    <UserCards />
                </MainContent>
            </Layout>
        </AppContainer>
    );
}

export default App;