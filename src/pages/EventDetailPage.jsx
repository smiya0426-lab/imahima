import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth, useEvents, useNotifications } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { getUserById, getCategoryById, formatDate } from '../data/mockData'
import UserAvatar from '../components/UserAvatar'
import CommentSection from '../components/CommentSection'
import './EventDetailPage.css'

export default function EventDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn } = useAuth()
  const { getEventById, joinEvent, leaveEvent, deleteEvent } = useEvents()
  const { addNotification } = useNotifications()
  const toast = useToast()

  const event = getEventById(id)

  if (!event) {
    return (
      <div className="event-detail-page" id="event-detail-page">
        <div className="container">
          <div className="event-not-found glass-card">
            <span className="empty-icon">🍻</span>
            <h2>イベントが見つかりません</h2>
            <p>このイベントは存在しないか、削除された可能性があります。</p>
            <Link to="/events" className="btn btn-primary">イベント一覧へ</Link>
          </div>
        </div>
      </div>
    )
  }

  const category = getCategoryById(event.category)
  const host = getUserById(event.host)
  const remaining = event.maxParticipants - event.participants.length
  const full = event.participants.length >= event.maxParticipants
  const isParticipant = isLoggedIn && event.participants.includes(currentUser?.id)
  const isHost = isLoggedIn && event.host === currentUser?.id

  const handleJoin = () => {
    if (!isLoggedIn) {
      toast.info('参加するにはログインが必要です')
      navigate('/login')
      return
    }

    joinEvent(event.id, currentUser.id)
    toast.success(`「${event.title}」に参加しました！🎉`)
    addNotification({
      type: 'event_join',
      title: 'イベントに参加しました',
      message: `「${event.title}」に参加登録が完了しました`,
      icon: '🎉',
      link: `/events/${event.id}`,
    })
  }

  const handleLeave = () => {
    leaveEvent(event.id, currentUser.id)
    toast.info('イベントの参加をキャンセルしました')
  }

  const handleDeleteEvent = () => {
    deleteEvent(event.id)
    toast.success('イベントを削除しました')
    navigate('/events')
  }

  return (
    <div className="event-detail-page" id="event-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)} id="back-btn">
          ← 戻る
        </button>

        <div className="event-detail-layout">
          {/* Main Content */}
          <div className="event-detail-main animate-fade-in-up">
            <div className="event-detail-header">
              <div className="event-detail-badges">
                <span className="badge badge-amber">
                  {category?.emoji} {category?.label}
                </span>
                {full ? (
                  <span className="badge badge-red">満席</span>
                ) : remaining <= 2 ? (
                  <span className="badge badge-red">🔥 残り{remaining}席</span>
                ) : (
                  <span className="badge badge-green">✅ 参加可能</span>
                )}
              </div>
              <h1 className="event-detail-title">{event.title}</h1>
            </div>

            <div className="event-detail-info glass-card">
              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <span className="detail-info-icon">📅</span>
                  <div>
                    <span className="detail-info-label">日時</span>
                    <span className="detail-info-value">{formatDate(event.date)} {event.time}〜</span>
                  </div>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-icon">📍</span>
                  <div>
                    <span className="detail-info-label">場所</span>
                    <span className="detail-info-value">{event.area} - {event.venue}</span>
                  </div>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-icon">💰</span>
                  <div>
                    <span className="detail-info-label">予算</span>
                    <span className="detail-info-value">{event.price}</span>
                  </div>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-icon">👥</span>
                  <div>
                    <span className="detail-info-label">定員</span>
                    <span className="detail-info-value">{event.participants.length} / {event.maxParticipants}人</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="event-detail-section">
              <h2 className="detail-section-title">イベント詳細</h2>
              <p className="event-detail-description">{event.description}</p>
              <div className="event-detail-tags">
                {event.tags.map((tag, i) => (
                  <span key={i} className="badge badge-purple">#{tag}</span>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div className="event-detail-section">
              <h2 className="detail-section-title">
                参加者（{event.participants.length}/{event.maxParticipants}）
              </h2>
              <div className="participants-list">
                {event.participants.map(pid => {
                  const user = getUserById(pid)
                  const displayName = user?.name || (isLoggedIn && pid === currentUser.id ? currentUser.name : '参加者')
                  const displayBio = user?.bio || (isLoggedIn && pid === currentUser.id ? currentUser.bio : '')
                  const displayInterests = user?.interests || (isLoggedIn && pid === currentUser.id ? currentUser.interests : [])
                  return (
                    <div key={pid} className="participant-card glass-card">
                      <UserAvatar name={displayName} size="lg" />
                      <div className="participant-info">
                        <span className="participant-name">
                          {displayName}
                          {pid === event.host && (
                            <span className="host-badge">👑 主催者</span>
                          )}
                          {isLoggedIn && pid === currentUser.id && pid !== event.host && (
                            <span className="host-badge" style={{color: 'var(--secondary-light)'}}>あなた</span>
                          )}
                        </span>
                        {displayBio && <span className="participant-bio">{displayBio}</span>}
                        <div className="participant-interests">
                          {(displayInterests || []).slice(0, 3).map((interest, i) => (
                            <span key={i} className="interest-tag">{interest}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Comments */}
            <CommentSection eventId={event.id} />
          </div>

          {/* Sidebar */}
          <div className="event-detail-sidebar animate-fade-in-up delay-2">
            {/* Host Card */}
            <div className="sidebar-card glass-card">
              <h3 className="sidebar-card-title">主催者</h3>
              <div className="host-info">
                <UserAvatar name={host?.name} size="xl" />
                <div>
                  <div className="host-card-name">{host?.name}</div>
                  <div className="host-card-bio">{host?.bio}</div>
                </div>
              </div>
            </div>

            {/* Join Card */}
            <div className="sidebar-card glass-card join-card">
              <div className="join-capacity">
                <div className="capacity-bar">
                  <div
                    className="capacity-fill"
                    style={{ width: `${(event.participants.length / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
                <span className="capacity-text">
                  {remaining > 0 ? `${remaining}席 空き` : '満席'}
                </span>
              </div>

              {isHost ? (
                <>
                  <div className="join-host-notice">
                    <span>👑</span>
                    <span>あなたが主催するイベントです</span>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteEvent}
                    style={{ width: '100%' }}
                    id="delete-event-btn"
                  >
                    このイベントを削除する
                  </button>
                </>
              ) : isParticipant ? (
                <>
                  <div className="join-status-badge">
                    <span>✅</span> 参加済み
                  </div>
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={handleLeave}
                    style={{ width: '100%' }}
                    id="leave-event-btn"
                  >
                    参加をキャンセル
                  </button>
                </>
              ) : (
                <button
                  className={`btn btn-lg ${full ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={handleJoin}
                  disabled={full}
                  style={{ width: '100%' }}
                  id="join-event-btn"
                >
                  {full ? '満席です' : '🍻 このイベントに参加する'}
                </button>
              )}

              <p className="join-note">
                参加は無料です。当日の飲食代は各自負担となります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
