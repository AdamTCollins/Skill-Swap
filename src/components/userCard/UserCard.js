import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import eventBus from '../../events/eventBus';
import { SWAP_EVENTS } from '../../events/eventTypes';

// Card container with animation for new users
const Card = styled.div`
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
    height: 360px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: ${props => props.isNew ? 'flashNew 2s ease-out' : 'none'};
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    @keyframes flashNew {
        0%, 100% { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
    }

    /* Add swipe animation */
    &.swiping-right {
        animation: swipeRight 0.5s forwards;
    }

    @keyframes swipeRight {
        to {
            transform: translateX(120%) rotate(5deg);
            opacity: 0;
        }
    }
`;

// Profile image container with gradient overlays
const UserImage = styled.div`
    height: 100%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center 20%;
    position: relative;

    /* Top gradient for better visibility of the user name tag */
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
        z-index: 0;
    }

    /* Bottom gradient for better visibility of the skill tags */
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        z-index: 0;
    }
`;

// User name and age tag
const UserInfo = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
`;

// Has skill tag (bottom left)
const HasSkill = styled.div`
    position: absolute;
    bottom: 15px;
    left: 15px;
    background-color: #3a86ff;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: flex;
    align-items: center;
    max-width: 45%;

    span {
        margin-right: 6px;
        font-weight: 700;
    }
`;

// Wants skill tag (bottom right)
const WantsSkill = styled.div`
    position: absolute;
    bottom: 15px;
    right: 15px;
    background-color: #ff6b6b;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: flex;
    align-items: center;
    max-width: 45%;

    span {
        margin-right: 6px;
        font-weight: 700;
    }
`;

// Add SwipeOverlay for instructions
const SwipeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 10;
  pointer-events: none;
  
  ${Card}:hover & {
    opacity: 0.9;
  }
  
  h3 {
    margin: 0 0 10px;
  }
  
  p {
    margin: 0;
    text-align: center;
    padding: 0 20px;
  }
`;

/**
 * UserCard component displays an individual user's profile
 *
 * @param {Object} user - The user data to display
 * @param {boolean} isNew - Whether this user was just added (for animation)
 * @returns {JSX.Element} The rendered user card
 */
const UserCard = ({ user, isNew: initialIsNew }) => {
    // State to track if the card is new (for animation)
    const [isNew, setIsNew] = useState(initialIsNew || false);
    // State to track if the image failed to load
    const [imageError, setImageError] = useState(false);
    // State to track if card is currently being swiped
    const [swiping, setSwiping] = useState(false);
    // Reference to the card DOM element
    const cardRef = useRef(null);

    // Touch tracking for swipe detection
    const touchStart = useRef(null);
    const touchEnd = useRef(null);

    // Minimum distance for a swipe
    const minSwipeDistance = 50;

    // Effect to handle the "new" status animation timing
    useEffect(() => {
        if (isNew) {
            const timer = setTimeout(() => {
                setIsNew(false); // Remove "new" status after 2 seconds
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isNew]);

    // Effect to handle image loading errors
    useEffect(() => {
        const img = new Image();
        img.src = user.image;
        img.onerror = () => setImageError(true);
    }, [user.image]);

    /**
     * Get the appropriate image URL for the user
     * Handles fallback for image loading errors
     */
    const getUserImage = () => {
        if (imageError) {
            return `https://ui-avatars.com/api/?name=${user.name}&background=random&size=400`;
        }
        return user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random&size=400`;
    };

    /**
     * Handle touch start event for swipe detection
     */
    const handleTouchStart = (e) => {
        touchStart.current = e.targetTouches[0].clientX;
    };

    /**
     * Handle touch move event for swipe detection
     */
    const handleTouchMove = (e) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    /**
     * Handle touch end event for swipe detection
     */
    const handleTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;

        const distance = touchEnd.current - touchStart.current;
        const isRightSwipe = distance > minSwipeDistance;

        if (isRightSwipe && !swiping) {
            handleSwipeRight();
        }

        // Reset values
        touchStart.current = null;
        touchEnd.current = null;
    };

    /**
     * Handle click event (alternative to swiping)
     */
    const handleClick = () => {
        handleSwipeRight();
    };

    /**
     * Process the right swipe action
     * Animate the card and dispatch swap event
     */
    const handleSwipeRight = () => {
        if (swiping) return;

        setSwiping(true);

        if (cardRef.current) {
            cardRef.current.classList.add('swiping-right');
        }

        // Dispatch SWAP_REQUESTED event
        eventBus.dispatch(SWAP_EVENTS.SWAP_REQUESTED, {
            id: Date.now(), // Generate unique ID
            user: user.name,
            offering: user.has,
            wanting: user.wants,
            avatar: `https://ui-avatars.com/api/?name=${user.name}&background=random&size=60`,
            requesterName: user.name,
            requesterSkill: user.has,
            requestedSkill: user.wants
        });

        // Remove card after animation completes
        setTimeout(() => {
            if (cardRef.current) {
                cardRef.current.style.display = 'none';
            }
        }, 500);
    };

    return (
        <Card
            ref={cardRef}
            isNew={isNew}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <UserImage src={getUserImage()}>
                <UserInfo>
                    {user.name}, {user.age}
                </UserInfo>
                <HasSkill>
                    <span>Has:</span> {user.has}
                </HasSkill>
                <WantsSkill>
                    <span>Wants:</span> {user.wants}
                </WantsSkill>

                <SwipeOverlay>
                    <h3>Interested?</h3>
                    <p>Click to request a skill swap!</p>
                </SwipeOverlay>
            </UserImage>
        </Card>
    );
};

export default UserCard;