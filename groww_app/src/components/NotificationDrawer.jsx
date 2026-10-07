import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, CheckCircle2, BookOpen, Target, GraduationCap } from 'lucide-react';

export function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, setNotifications, navigateTo, openLesson } = useApp();

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    onClose();

    if (notif.type === 'learning') {
      openLesson('what-is-a-sip');
    } else if (notif.type === 'goal') {
      navigateTo('goals');
    } else if (notif.type === 'campus') {
      navigateTo('campus');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'learning': return <BookOpen size={16} color="var(--primary-dark)" />;
      case 'goal': return <Target size={16} color="var(--accent-blue)" />;
      case 'campus': return <GraduationCap size={16} color="var(--accent-purple)" />;
      default: return <Bell size={16} color="var(--text-muted)" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: 460, margin: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={18} color="var(--primary-dark)" />
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Notifications & Habit Reminders</h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '12px 20px', background: 'var(--bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
          <span style={{ color: 'var(--text-muted)' }}>Educational nudges, zero FOMO tips.</span>
          <button onClick={markAllAsRead} style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>
            Mark all read
          </button>
        </div>

        <div style={{ padding: '12px 20px', maxHeight: 400, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
              No new notifications
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 10,
                  background: n.read ? '#FFFFFF' : 'var(--primary-light)',
                  border: `1px solid ${n.read ? 'var(--border-color)' : 'var(--primary-border)'}`,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 13, color: 'var(--text-main)' }}>
                    {getIcon(n.type)}
                    <span>{n.title}</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4, margin: '4px 0 0 22px' }}>
                  {n.message}
                </p>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-color)', textAlign: 'center', background: 'var(--bg-subtle)' }}>
          <span style={{ fontSize: 11, color: 'var(--text-light)' }}>
            🔒 We never send speculative trading alerts or panic notifications.
          </span>
        </div>
      </div>
    </div>
  );
}
