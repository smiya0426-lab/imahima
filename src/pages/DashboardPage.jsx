import { Link } from 'react-router-dom'
import { useAuth, useEvents, useNotifications } from '../context/AppContext'
import EventCard from '../components/EventCard'
import { formatRelativeTime } from '../data/extraData'
import { CATEGORIES } from '../data/mockData'
import './DashboardPage.css'

export default function DashboardPage() {
  const { currentUser } = useAuth()
  const { events } = useEvents()
  const { notifications } = useNotifications()

  // Events user is participating in
  const myEvents = events.filter(e =>
    e.participants.includes(currentUser?.id)
  )

  // Events user is hosting
  const hostedEvents = events.filter(e => e.host === currentUser?.id)

  // Recommended events (not joined, not full)
  const recommended = events.filter(e =>
    !e.participants.includes(currentUser?.id) &&
    e.participants.length < e.maxParticipants
  ).slice(0, 3)

  // Recent notifications
  const recentNotifs = notifications.slice(0, 5)

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'おはようございます'
    if (hour < 18) return 'こんにちは'
    return 'こんばんは'
  }

  return (
    <div className="dashboard-page" id="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header animate-fade-in-down">
          <div className="dashboard-greeting">
            <h1 className="dashboard-title">
              {getGreeting()}、<span className="text-gradient">{currentUser?.name}</span>さん 🍻
            </h1>
            <p className="dashboard-subtitle">今日も素敵な飲み仲間を見つけよう</p>
          </div>
          <Link to="/create" className="btn btn-primary btn-lg" id="dashboard-create">
            ＋ イベントを作成
          </Link>
        </div>

        {/* Stats */}
        <div className="dashboard-stats animate-fade-in-up delay-1">
          <div className="stat-card glass-card">
            <div className="stat-icon">📅</div>
            <div className="stat-value">{myEvents.length}</div>
            <div className="stat-label">参加予定</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon">👑</div>
            <div className="stat-value">{hostedEvents.length}</div>
            <div className="stat-label">主催イベント</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon">🍻</div>
            <div className="stat-value">{currentUser?.interests?.length || 0}</div>
            <div className="stat-label">興味ジャンル</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon">🔔</div>
            <div className="stat-value">{notifications.filter(n => !n.read).length}</div>
            <div className="stat-label">未読通知</div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Main Content */}
          <div className="dashboard-main">
            {/* Upcoming Events */}
            <section className="dashboard-section animate-fade-in-up delay-2">
              <div className="section-top">
                <h2 className="dash-section-title">📅 参加予定のイベント</h2>
                <Link to="/profile" className="section-link">すべて見る →</Link>
              </div>
              {myEvents.length > 0 ? (
                <div className="dashboard-events-grid">
                  {myEvents.slice(0, 2).map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty glass-card">
                  <span>📅</span>
                  <p>まだ参加予定のイベントがありません</p>
                  <Link to="/events" className="btn btn-secondary">イベントを探す</Link>
                </div>
              )}
            </section>

            {/* Recommended */}
            <section className="dashboard-section animate-fade-in-up delay-3">
              <div className="section-top">
                <h2 className="dash-section-title">✨ おすすめのイベント</h2>
                <Link to="/events" className="section-link">もっと見る →</Link>
              </div>
              <div className="dashboard-events-grid">
                {recommended.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            {/* Quick Categories */}
            <div className="sidebar-section glass-card animate-fade-in-up delay-2">
              <h3 className="sidebar-title">🏷️ カテゴリから探す</h3>
              <div className="category-quick-links">
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <Link
                    key={cat.id}
                    to={`/events?category=${cat.id}`}
                    className="category-quick-link"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="sidebar-section glass-card animate-fade-in-up delay-3">
              <div className="section-top">
                <h3 className="sidebar-title">🔔 最新の通知</h3>
                <Link to="/notifications" className="section-link">すべて →</Link>
              </div>
              <div className="notif-list">
                {recentNotifs.map(notif => (
                  <Link
                    key={notif.id}
                    to={notif.link || '#'}
                    className={`notif-item ${!notif.read ? 'unread' : ''}`}
                  >
                    <span className="notif-icon">{notif.icon}</span>
                    <div className="notif-content">
                      <span className="notif-message">{notif.message}</span>
                      <span className="notif-time">{formatRelativeTime(notif.timestamp)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
