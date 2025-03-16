// src/components/Header.js
import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #f7232a;
    color: white;
    padding: 0 20px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const MenuButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }
`;

const Title = styled.h2`
    margin: 0;
    font-weight: bold;
    font-size: 20px;
`;

const BrandText = styled.h1`
    font-size: 24px;
    margin: 0;
    font-weight: 800;
    letter-spacing: 1px;
`;

const Drawer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: #f7232a;
    z-index: 1001;
    transform: ${props => props.open ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    box-shadow: ${props => props.open ? '2px 0 8px rgba(0,0,0,0.2)' : 'none'};
`;

const DrawerOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: ${props => props.open ? 'block' : 'none'};
`;

const DrawerList = styled.ul`
    list-style: none;
    padding: 20px 0;
    margin: 0;
`;

const DrawerItem = styled.li`
    padding: 12px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
    color: white;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const IconPlaceholder = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <HeaderContainer>
                <Logo>
                    <MenuButton onClick={handleDrawerOpen}>☰</MenuButton>
                    <Title>Dashboard</Title>
                </Logo>
                <BrandText>SKILL SWAP</BrandText>
            </HeaderContainer>

            <DrawerOverlay open={drawerOpen} onClick={handleDrawerClose} />

            <Drawer open={drawerOpen}>
                <DrawerList>
                    <DrawerItem onClick={handleDrawerClose}>
                        <IconPlaceholder>🏠</IconPlaceholder>
                        Home
                    </DrawerItem>
                    <DrawerItem onClick={handleDrawerClose}>
                        <IconPlaceholder>👤</IconPlaceholder>
                        Profile
                    </DrawerItem>
                    <DrawerItem onClick={handleDrawerClose}>
                        <IconPlaceholder>🔔</IconPlaceholder>
                        Notifications
                    </DrawerItem>
                    <DrawerItem onClick={handleDrawerClose}>
                        <IconPlaceholder>⚙️</IconPlaceholder>
                        Settings
                    </DrawerItem>
                </DrawerList>
            </Drawer>
        </>
    );
};

export default Header;