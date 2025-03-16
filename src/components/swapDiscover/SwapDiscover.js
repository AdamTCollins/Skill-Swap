
import React from 'react';
import styled from 'styled-components';

const DiscoverContainer = styled.section`
    padding: 20px; // Increased padding
    border-bottom: 1px solid #eee;
`;

const Title = styled.h2`
    margin: 0 0 12px 0;
    font-size: 24px; // Larger font
    font-weight: 600;
`;

const Description = styled.p`
    margin: 0;
    color: #555;
    font-size: 15px; // Slightly larger font
    line-height: 1.4;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
`;

const Icon = styled.div`
    width: 36px; // Larger icon
    height: 36px;
    background-color: #f25c78;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
`;

const SwapDiscover = () => {
    return (
        <DiscoverContainer>
            <IconWrapper>
                <Icon>
                    <span role="img" aria-label="light bulb">💡</span>
                </Icon>
                <Title>Discover New Swaps</Title>
            </IconWrapper>
            <Description>Start swiping to connect with new people!</Description>
        </DiscoverContainer>
    );
};

export default SwapDiscover;