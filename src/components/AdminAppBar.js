/**
 * AdminAppBar Component.
 *
 * Provides the main navigation header for our application that includes a
 * hamburger menu which opens a drawer with some navigation options.
 *
 * This component is demonstrating UI state management within a component
 * (drawerOpen state) without needing to participate in the event system.
 */
import React, { useState } from 'react';
import styled from 'styled-components';

// Fixed app bar at the top of the page.
const AppBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f7232a;
  color: white;
  z-index: 1000;
`;

// Toolbar content container.
const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 64px;
`;

// Left section of the toolbar.
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

// Hamburger menu button.
const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  margin-right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Title text.
const Title = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 20px;
  color: white;
`;

// Website title.
const BrandTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: 800;
  color: white;
`;

// Drawer menu that slides in from the left.
const Drawer = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  width: 240px;
  height: calc(100vh - 64px);
  background-color: #f7232a;
  transform: ${props => props.open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  z-index: 999;
`;

// Navigation list in the drawer.
const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Navigation item.
const NavItem = styled.li`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Icon for nav items.
const Icon = styled.span`
  margin-right: 15px;
  font-size: 20px;
`;

// Semi-transparent overlay behind the drawer.
const Overlay = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: ${props => props.open ? 'block' : 'none'};
`;

// Spacer that prevents content from being hidden under the fixed app bar.
const Spacer = styled.div`
  height: 64px;
`;

/**
 * The AdminAppBar component provides the main navigation for the application.
 *
 * @returns {JSX.Element} The rendered app bar with drawer menu
 */
export default function AdminAppBar() {
    // State to track if the drawer is open.
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Handler for opening the drawer.
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    // Handler for closing the drawer.
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <LeftSection>
                        <MenuButton onClick={handleDrawerOpen}>☰</MenuButton>
                        <Title>Dashboard</Title>
                    </LeftSection>
                    <BrandTitle>SKILL SWAP</BrandTitle>
                </Toolbar>
            </AppBarContainer>

            <Overlay open={drawerOpen} onClick={handleDrawerClose} />

            <Drawer open={drawerOpen}>
                <NavList>
                    <NavItem onClick={handleDrawerClose}>
                        <Icon>🏠</Icon> Home
                    </NavItem>
                    <NavItem onClick={handleDrawerClose}>
                        <Icon>👤</Icon> Profile
                    </NavItem>
                    <NavItem onClick={handleDrawerClose}>
                        <Icon>🔔</Icon> Notifications
                    </NavItem>
                    <NavItem onClick={handleDrawerClose}>
                        <Icon>⚙️</Icon> Settings
                    </NavItem>
                </NavList>
            </Drawer>

            <Spacer />
        </>
    );
}