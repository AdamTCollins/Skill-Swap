/**
 * UserCard Component.
 *
 * This file displays a single user card with their profile picture, name, age, and skills.
 * Also includes an animation for newly added users to highlight the event-driven updates.
 *
 * Event-Driven Pattern: This component receives props from UserCards which subscribes
 * to Redux state changes. When a USER_JOINED event occurs, the state updates, triggering
 * re-renders of this component without it needing to know about the event directly.
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Card container with animation for new users.
const Card = styled.div`
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
    height: 340px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: ${props => props.isNew ? 'flashNew 2s ease-out' : 'none'};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    @keyframes flashNew {
        0%, 100% { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
    }
`;

// Profile image container with gradient overlays.
const UserImage = styled.div`
    height: 100%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center 20%;
    position: relative;

    // Top gradient for better visibility of the user name tag.
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

    // Bottom gradient for better visibility of the skill tags.
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

// User name and age tag.
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

// Has skill tag.
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

// Wants skill tag.
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

/**
 * The UserCard component displays an individual user's profile.
 *
 * @param {Object} user - The user data to display
 * @param {boolean} isNew - Whether this user was just added (for animation)
 * @returns {JSX.Element} The rendered user card
 */
const UserCard = ({ user, isNew: initialIsNew }) => {
    // State to track if the card is new (for animation).
    const [isNew, setIsNew] = useState(initialIsNew || false);

    // State to track if the image failed to load.
    const [imageError, setImageError] = useState(false);

    // Effect to handle the "new" status animation timing.
    useEffect(() => {
        if (isNew) {
            const timer = setTimeout(() => {
                setIsNew(false);
                // Removes "new" status after 2 seconds.
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isNew]);

    // Effect to handle image loading errors.
    useEffect(() => {
        const img = new Image();
        img.src = user.image;
        img.onerror = () => setImageError(true);
    }, [user.image]);

    /**
     * Getting the appropriate image URL for the user.
     * Handles fallback for image loading errors.
     */
    const getUserImage = () => {
        if (imageError) {
            return `https://ui-avatars.com/api/?name=${user.name}&background=random&size=400`;
        }
        return user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random&size=400`;
    };

    return (
        <Card isNew={isNew}>
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
            </UserImage>
        </Card>
    );
};

export default UserCard;