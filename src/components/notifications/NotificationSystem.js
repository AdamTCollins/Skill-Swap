import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000;
`;

const Notification = styled.div`
  background-color: #fff;
  border-left: 4px solid #f25c78;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 4px;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const NotificationSystem = () => {
    const notifications = useSelector(state => state.notifications.items);

    return (
        <NotificationContainer>
            {notifications.map(notification => (
                <Notification key={notification.id}>
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                </Notification>
            ))}
        </NotificationContainer>
    );
};

export default NotificationSystem;