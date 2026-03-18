import { Link } from 'react-router-dom'
import { useNotifications } from '../context/AppContext'
import { formatRelativeTime } from '../data/extraData'
import './NotificationsPage.css'

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications()

  return (
    <div className="notifications-page" id="notifications-page">
      <div className="container">
        <div className="notifications-header animate-fade-in-down">
          <div>
            <h1 className="notifications-title">
              🔔 <span className="text-gradient">通知</span>
            </h1>
            <p className="notifications-subtitle">
              {unreadCount > 0 ? `${unreadCount}件の未読通知` : 'すべて既読です'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              className="btn btn-secondary"
              onClick={markAllAsRead}
              id="mark-all-read"
            >
              すべて既読にする
            </button>
          )}
        </div>

        <div className="notifications-list animate-fade-in-up delay-1">
          {notifications.length === 0 ? (
            <div className="notifications-empty glass-card">
              <span>🔔</span>
              <h3>通知はありません</h3>
              <p>イベントに参加すると通知が届きます</p>
            </div>
          ) : (
            notifications.map(notif => (
              <Link
                key={notif.id}
                to={notif.link || '#'}
                className={`notification-card glass-card ${!notif.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notif.id)}
                id={`notif-${notif.id}`}
              >
                <div className="notification-icon-wrap">
                  <span className="notification-icon">{notif.icon}</span>
                </div>
                <div className="notification-body">
                  <h3 className="notification-title">{notif.title}</h3>
                  <p className="notification-message">{notif.message}</p>
                  <span className="notification-time">{formatRelativeTime(notif.timestamp)}</span>
                </div>
                {!notif.read && <div className="notification-dot"></div>}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
