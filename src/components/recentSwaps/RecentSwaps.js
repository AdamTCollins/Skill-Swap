// src/components/recentSwaps/RecentSwaps.js
import React from 'react';
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

const SwapItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    gap: 15px;
    padding: 10px;
    border-radius: 8px;
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

const RecentSwaps = () => {
    const swaps = useSelector((state) => state?.swaps?.swaps || []);

    // Define getAvatarColor function with alternating colors
    const getAvatarColor = (index) => {
        const colors = ['#f25c78', '#4ecdc4'];
        return colors[index % colors.length];
    };

    return (
        <SwapsContainer>
            <Title>Recent Swaps</Title>

            {swaps.map((swap, index) => (
                <SwapItem key={swap.id}>
                    <Avatar color={getAvatarColor(index)}>
                        {swap.user.charAt(0)}
                    </Avatar>
                    <SwapInfo>
                        <h3>{swap.user}</h3>
                        <p>Exchanging {swap.offering} for {swap.wanting}</p>
                    </SwapInfo>
                </SwapItem>
            ))}
        </SwapsContainer>
    );
};

export default RecentSwaps;