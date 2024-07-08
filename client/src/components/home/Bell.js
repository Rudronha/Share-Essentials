import React, { useState, useEffect } from 'react';
import './Bell.css';

const Bell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications from an API or mock data
    const fetchNotifications = async () => {
      // Example API request
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-dropdown">
      {notifications.length === 0 ? (
        <p className="no-notifications">No new notifications.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bell;
