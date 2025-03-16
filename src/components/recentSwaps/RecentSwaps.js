/**
 * RecentSwaps Component
 *
 * Displays the list of recent skill swap requests.
 * Updates in real-time when new swap requests are made.
 * Shows notifications when new swaps are created.
 *
 * Event-Driven Pattern: This component subscribes to the Redux store's swaps state,
 * which is updated by SWAP_REQUESTED events. When a new swap is requested (either
 * by a direct card swipe or through the event system), this component automatically
 * updates to show the new swap.
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SwapsContainer = styled.section`
    padding: 20px;
`;

const Title = styled.h2`
    color: #f25c78;
    margin-bottom: 25px;
    font-size: 24px;
    font-weight: 600;
`;

// SwapItem with animation for new swaps
const SwapItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    gap: 15px;
    padding: 10px;
    border-radius: 8px;
    animation: ${props => props.isNew ? 'flashNew 2s ease-out' : 'none'};

    @keyframes flashNew {
        0%, 100% { background-color: transparent; }
        50% { background-color: rgba(255, 215, 0, 0.2); }
    }
`;

const Avatar = styled.div`
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 22px;
`;

const SwapInfo = styled.div`
    flex: 1;

    h3 {
        margin: 0 0 5px 0;
        font-size: 18px;
        font-weight: bold;
    }

    p {
        margin: 0;
        font-size: 14px;
        color: #555;
        line-height: 1.3;
    }
`;

// Add a new component for notifications
const NewSwapNotification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 1000;
  animation: slideIn 0.3s, fadeOut 0.5s 2.5s forwards;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`;

/**
 * RecentSwaps component that displays the list of recent swaps
 * Shows notifications when new swaps are created
 */
const RecentSwaps = () => {
    // Subscribe to the swaps array in Redux state
    const swaps = useSelector((state) => state?.swaps?.swaps || []);
    // Track which swaps are new for animation
    const [newSwapIds, setNewSwapIds] = useState({});
    // State for notification message
    const [notification, setNotification] = useState(null);

    // Effect to track new swaps and show notifications
    useEffect(() => {
        // Track when new swaps are added
        const prevLength = Object.keys(newSwapIds).length;
        const latestSwap = swaps[0];

        if (swaps.length > 0 && (!newSwapIds[latestSwap.id]) && prevLength > 0) {
            // Show notification for new swap
            setNotification(`Swap request sent to ${latestSwap.user}!`);

            // Clear notification after 3 seconds
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);

            return () => clearTimeout(timer);
        }

        // Track new swaps by ID
        const newSwaps = swaps.slice(0, 1).reduce((acc, swap) => {
            acc[swap.id] = true;
            return acc;
        }, {});

        if (Object.keys(newSwaps).length > 0) {
            setNewSwapIds({...newSwapIds, ...newSwaps});
        }
    }, [swaps, newSwapIds]);

    // Define getAvatarColor function with alternating colors
    const getAvatarColor = (index) => {
        const colors = ['#f25c78', '#4ecdc4'];
        return colors[index % colors.length];
    };

    return (
        <SwapsContainer>
            <Title>Swap Requests</Title>

            {swaps.map((swap, index) => (
                <SwapItem key={swap.id} isNew={newSwapIds[swap.id]}>
                    <Avatar color={getAvatarColor(index)}>
                        {swap.user.charAt(0)}
                    </Avatar>
                    <SwapInfo>
                        <h3>{swap.user}</h3>
                        <p>Exchanging {swap.offering} for {swap.wanting}</p>
                    </SwapInfo>
                </SwapItem>
            ))}

            {notification && (
                <NewSwapNotification>
                    {notification}
                </NewSwapNotification>
            )}
        </SwapsContainer>
    );
};

export default RecentSwaps;